package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.domain.EstadoVooEnum
import br.ufpr.dac.voo_service.repository.IVooRepository
import org.springframework.stereotype.Service
import utils.dto.VooOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import br.ufpr.dac.voo_service.domain.Voo
import br.ufpr.dac.voo_service.repository.IAeroportoRepository
import br.ufpr.dac.voo_service.repository.IEstadoVooRepository
import br.ufpr.dac.voo_service.resource.mapper.VooMapper
import utils.exceptions.ResourceNotFoundException
import utils.exceptions.ResourcesConflictException
import java.lang.IllegalArgumentException
import java.time.LocalDate
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

@Service
class VooService(
    private val repository: IVooRepository,
    private val aeroporoRepository: IAeroportoRepository,
    private val estadoVooRepository: IEstadoVooRepository
) {

    fun getVooById(id: String): Voo {
        return repository.findById(id).orElseThrow { ResourceNotFoundException("Voo não encontrado com o id ${id}") }
    }

    fun saveVoo(input: VooInputDTO): Voo {
        input.codigo = "TADS" + (repository.count() + 1).toString().padStart(4, '0')
        val estado = estadoVooRepository.findById(EstadoVooEnum.CONFIMADO.codigo).get()
        val aeroporto_origem = aeroporoRepository.findById(input.codigo_aeroporto_origem).orElseThrow{
            ResourceNotFoundException("Aeroporto de origem inválido")
        }
        val aeroporto_destino = aeroporoRepository.findById(input.codigo_aeroporto_destino).orElseThrow{
            ResourceNotFoundException("Aeroporto de destino inválido")
        }
        val voo = VooMapper.toDomain(input, aeroporto_origem, aeroporto_destino)
        voo.estado = estado
        return repository.save(voo)
    }

    fun cancelaVoo(codigo: String): Voo {
        val voo = repository.findById(codigo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: $codigo") }
        if (voo.estado!!.codigo != EstadoVooEnum.CONFIMADO.codigo) {
            throw IllegalArgumentException("Um voo só pode ser cancelado no estado CONFIRMADO")
        }
        val estado = estadoVooRepository.findById(EstadoVooEnum.CANCELADO.codigo).get()
        voo.estado = estado
        return repository.save(voo)
    }

    fun realizaVoo(codigo: String): Voo {
        val voo = repository.findById(codigo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: $codigo") }
        if (voo.estado!!.codigo != EstadoVooEnum.CONFIMADO.codigo) {
            throw IllegalArgumentException("Um voo só pode ser realizado no estado CONFIRMADO")
        }
        val estado = estadoVooRepository.findById(EstadoVooEnum.REALIZADO.codigo).get()
        voo.estado = estado
        return repository.save(voo)
    }

    fun verificaEAtualizaLotacao(codigoVoo: String, quantidadePoltronas: Int): VooOutputDTO {
        val voo = repository.findById(codigoVoo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: ${codigoVoo}") }

        val poltronasLivres = voo.quantidade_poltronas_total - voo.quantidade_poltronas_ocupadas
        if (poltronasLivres < quantidadePoltronas) {
            throw ResourcesConflictException("Não há poltronas suficientes disponíveis para a reserva.")
        }

        voo.quantidade_poltronas_ocupadas += quantidadePoltronas

        return VooMapper.toDTO(repository.save(voo))
    }

    fun liberaLotacao(codigoVoo: String, quantidadePoltronas: Int): VooOutputDTO {
        val voo = repository.findById(codigoVoo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: ${codigoVoo}") }

        voo.quantidade_poltronas_ocupadas -= quantidadePoltronas

        return VooMapper.toDTO(repository.save(voo))
    }

    fun getFilteredVoos(
        origem: String?, destino: String?, data: String?, inicio: String?, fim: String?
    ): List<VooOutputDTO> {
        val voos = repository.findAll()
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX")

        val filteredVoos = voos.filter { voo ->
            val matchesOrigem = origem?.let { voo.aeroporto_origem.codigo == it } ?: true
            val matchesDestino = destino?.let { voo.aeroporto_destino.codigo == it } ?: true
            val matchesData = data?.let {
                val dataInicio = ZonedDateTime.parse(it.replace("Z", ""), formatter)
                voo.data.isAfter(dataInicio) || voo.data.isEqual(dataInicio)
            } ?: true
            val matchesDateRange = if (inicio != null && fim != null) {
                val dataInicio = LocalDate.parse(inicio)
                val dataFim = LocalDate.parse(fim)
                (voo.data.toLocalDate().isAfter(dataInicio) || voo.data.toLocalDate()
                    .isEqual(dataInicio)) && (voo.data.toLocalDate().isBefore(dataFim) || voo.data.toLocalDate()
                    .isEqual(dataFim))
            } else true

            matchesOrigem && matchesDestino && matchesData && matchesDateRange
        }

        return filteredVoos.map { VooMapper.toDTO(it) }
    }
}
