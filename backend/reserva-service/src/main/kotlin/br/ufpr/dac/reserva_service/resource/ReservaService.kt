package br.ufpr.dac.reserva_service.resource

import br.ufpr.dac.reserva_service.domain.*
import br.ufpr.dac.reserva_service.domain.embeddable.PoltronasReservadasId
import br.ufpr.dac.reserva_service.repository.*
import br.ufpr.dac.reserva_service.resource.dto.ReservaConsultaInputDTO
import br.ufpr.dac.reserva_service.resource.mapper.ReservaMapper
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.dto.*
import utils.exceptions.ResourceNotFoundException
import utils.exceptions.ResourcesConflictException
import utils.gson.ZonedDateTimeAdapter
import java.lang.IllegalArgumentException
import java.time.ZoneOffset
import java.time.ZonedDateTime

@Service
class ReservaService(
    private val template: RabbitTemplate,
    private val repository: ITransactionRepository,
    private val consultaReposity: IConsultaRepository,
    private val poltronaRepository: IPoltronaRepository,
    private val historicoRepository: IHistoricoRepository,
    private val estadoReservaRepository: IEstadoReservaRepository,
    @Qualifier("reservasCQRSExchange") val exchange: DirectExchange
) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    fun listPoltronasOcupadas(voo: String): List<Int> {
        val poltronas = poltronaRepository.getPoltronasReservadas(voo)
        return poltronas.map { it.id.codigo }
    }

    fun listReservasByCliente(codigo: Long): List<ReservaOutputDTO> {
        val reservas = consultaReposity.findReservasByCodigoCliente(codigo)
        return reservas.map { ReservaMapper.toDTO(it) }
    }

    fun detailReserva(codigo: String): ReservaOutputDTO {
        consultaReposity.findReservaByCodigo(codigo)?.let {
            return ReservaMapper.toDTO(it)
        }

        throw ResourceNotFoundException("Reserva não encontrada com o código fornecido.")
    }

    fun efetuarReserva(reserva: ReservaTransactionDTO): ReservaCreationResponseDTO {
        val poltronasReservadas = reserva.poltronas_reservadas?.also {
            val totalPoltronas = reserva.voo.quantidade_poltronas_total
            if (it.any { poltrona -> poltrona < 1 || poltrona > totalPoltronas }) {
                throw ResourcesConflictException("Uma ou mais poltronas reservadas estão fora do intervalo permitido (1 a $totalPoltronas).")
            }
            val poltronasOcupadas = listPoltronasOcupadas(reserva.voo.codigo)
            if (it.any { poltrona -> poltronasOcupadas.contains(poltrona) }) {
                throw ResourcesConflictException("Uma ou mais poltronas reservadas não estão disponíveis")
            }
        } ?: run {
            val poltronasOcupadas = listPoltronasOcupadas(reserva.voo.codigo)
            val todasPoltronas = (1..reserva.voo.quantidade_poltronas_total).toList()
            val poltronasDisponiveis = todasPoltronas - poltronasOcupadas

            if (poltronasDisponiveis.size < reserva.quantidade_poltronas) {
                throw ResourcesConflictException("Não há poltronas suficientes disponíveis para a reserva.")
            }

            poltronasDisponiveis.shuffled().take(reserva.quantidade_poltronas)
        }

        val codigo = "RES" + (repository.count() + 1).toString().padStart(4, '0')
        val quantidade_milhas = reserva.milhas_utilizadas + (reserva.valor / 5)
        val estadoReserva = estadoReservaRepository.findById(EstadoReservaEnum.CRIADA.codigo).get()
        val data = ZonedDateTime.now(ZoneOffset.of("-03:00"))

        val input = Reserva(codigo, reserva.codigo_cliente, reserva.voo.codigo, estadoReserva, quantidade_milhas)

        repository.save(input)
        historicoRepository.save(HistoricoReserva(0L, data, input, null, estadoReserva))

        val poltronasReservadasEntidades = poltronasReservadas.map { poltrona ->
            PoltronasReservadas(
                id = PoltronasReservadasId(codigo = poltrona, codigo_voo = reserva.voo.codigo),
                codigo_cliente = reserva.codigo_cliente,
                codigo_reserva = codigo
            )
        }
        poltronaRepository.saveAll(poltronasReservadasEntidades)

        val reservaConsulta: List<ReservaConsultaInputDTO> = poltronasReservadas.map { poltrona ->
            ReservaConsultaInputDTO(
                codigo = codigo,
                poltrona = poltrona,
                codigo_cliente = reserva.codigo_cliente,
                codigo_voo = reserva.voo.codigo,
                estado = estadoReserva.descricao,
                quantidade_milhas = quantidade_milhas,
                data = data
            )
        }

        template.convertAndSend(exchange.name, "gravacao", gson.toJson(reservaConsulta))

        return ReservaCreationResponseDTO(
            data,
            codigo,
            estadoReserva.descricao,
            reserva.codigo_cliente,
            poltronasReservadas,
            quantidade_milhas.toFloat(),
            "${reserva.voo.aeroporto_origem.codigo}->${reserva.voo.aeroporto_destino.codigo}",
            reserva.valor
        )
    }

    fun cancelarReserva(codigo: String): ReservaOutputDTO {
        val reserva = repository.findById(codigo).orElseThrow {
            throw ResourceNotFoundException("Reserva não encontrada com o código fornecido.")
        }
        if (reserva.estado.codigo !in arrayOf(EstadoReservaEnum.CRIADA.codigo, EstadoReservaEnum.CHECK_IN.codigo)) {
            throw IllegalArgumentException("Uma reserva só pode ser cancelada nos estados CRIADA ou CHECK-IN")
        }

        poltronaRepository.deletePoltronasCanceladas(codigo)
        return atualizarEstadoReserva(reserva, EstadoReservaEnum.CANCELADA.codigo)
    }

    fun alterarEstado(codigo: String, payload: AlternaEstadoDTO): ReservaOutputDTO {
        val reserva = repository.findById(codigo).orElseThrow {
            throw ResourceNotFoundException("Reserva não encontrada com o código fornecido.")
        }
        val novoEstado = validaAlteracaoEstado(payload.estado, reserva.estado).codigo

        return atualizarEstadoReserva(reserva, novoEstado)
    }

    fun canceladoVoo(voo: VooOutputDTO): List<ReservaOutputDTO> {
        val reservas = repository.findByCodigoVoo(voo.codigo)
        return reservas.map { atualizarEstadoReserva(it, EstadoReservaEnum.CANCELADA_VOO.codigo) }
    }

    fun realizaVoo(voo: VooOutputDTO) {
        val reservas = repository.findByCodigoVoo(voo.codigo)
        reservas.forEach { res ->
            val estado = when (res.estado.codigo) {
                EstadoReservaEnum.EMBARCADA.codigo -> EstadoReservaEnum.REALIZADA
                EstadoReservaEnum.CANCELADA.codigo -> EstadoReservaEnum.CANCELADA
                else -> EstadoReservaEnum.NAO_REALIZADA
            }
            atualizarEstadoReserva(res, estado.codigo)
        }
    }

    private fun atualizarEstadoReserva(reserva: Reserva, codigo_estado: Long): ReservaOutputDTO {
        val data = ZonedDateTime.now(ZoneOffset.of("-03:00"))
        val estadoAntigo = reserva.estado
        val estadoNovo = estadoReservaRepository.findById(codigo_estado).get()
        reserva.estado = estadoNovo
        val reservaAtualizada = repository.save(reserva)

        historicoRepository.save(HistoricoReserva(0L, data, reservaAtualizada, estadoAntigo, estadoNovo))
        val poltronas = poltronaRepository.getPoltronasReservadas(reserva.codigo_voo)

        template.convertAndSend(
            exchange.name,
            "edicao",
            gson.toJson(ReservaUpdateEstadoDTO(reservaAtualizada.codigo, reservaAtualizada.estado.descricao, data))
        )

        return ReservaOutputDTO(
            reservaAtualizada.codigo,
            data,
            reservaAtualizada.estado.descricao,
            reservaAtualizada.quantidade_milhas.toFloat(),
            reservaAtualizada.codigo_cliente,
            null,
            poltronas.map { it.id.codigo },
            null,
            reservaAtualizada.codigo_voo
        )
    }

    private fun validaAlteracaoEstado(estadoDesejado: String, estadoAtual: EstadoReserva): EstadoReservaEnum {
        val transicoesValidas = mapOf(
            "CHECK-IN" to EstadoReservaEnum.CRIADA,
            "EMBARCADA" to EstadoReservaEnum.CHECK_IN
        )

        val estadoDesejadoEnum = EstadoReservaEnum.valueOf(estadoDesejado.uppercase().replace("-", "_"))
        val estadoAtualEsperado = transicoesValidas[estadoDesejado.uppercase()]
            ?: throw IllegalArgumentException("Estado desejado inválido: $estadoDesejado")

        if (estadoAtual.codigo != estadoAtualEsperado.codigo) {
            throw IllegalArgumentException("Condições para troca de estado não atendidas")
        }

        return estadoDesejadoEnum
    }
}