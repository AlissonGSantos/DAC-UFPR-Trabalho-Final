package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.domain.TipoTransacao
import br.ufpr.dac.cliente_service.domain.Transacao
import br.ufpr.dac.cliente_service.repository.IClienteRepository
import br.ufpr.dac.cliente_service.repository.ITransacaoRepository
import utils.dto.ExtratoDTO
import br.ufpr.dac.cliente_service.resource.dto.MilhasCompraDTO
import br.ufpr.dac.cliente_service.resource.mapper.ClienteMapper
import br.ufpr.dac.cliente_service.resource.mapper.TransacaoMapper
import org.springframework.stereotype.Service
import utils.dto.ClienteOutputDTO
import utils.dto.ReservaCreationResponseDTO
import utils.dto.ReservaOutputDTO
import utils.exceptions.ResourceNotFoundException
import java.time.ZonedDateTime

@Service
class MilhasService(
    private val repository: IClienteRepository,
    private val transacaoRepository: ITransacaoRepository
) {

    fun comprarMilhas(codigo: Long, milhas: MilhasCompraDTO): ClienteOutputDTO {
        repository.findByCodigoAndAtivoTrue(codigo)?.let { cliente ->
            val quantidade = milhas.quantidade

            val nova_transacao = Transacao(
                cliente = cliente,
                codigo_reserva = null,
                data = ZonedDateTime.now(),
                quantidade_milhas = quantidade,
                valor = quantidade * 5.0,
                descricao = "COMPRA DE MILHAS",
                tipo = TipoTransacao.ENTRADA
            )

            transacaoRepository.save(nova_transacao)
            cliente.saldo_milhas += quantidade

            return ClienteMapper.toDTO(repository.save(cliente))
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: $codigo")
    }

    fun registrarReserva(reserva: ReservaCreationResponseDTO): ExtratoDTO {
        repository.findByCodigoAndAtivoTrue(reserva.codigo_cliente)?.let { cliente ->
            val quantidade = reserva.quantidade_milhas

            val nova_transacao = Transacao(
                cliente = cliente,
                codigo_reserva = reserva.codigo_reserva,
                data = reserva.data,
                quantidade_milhas = -quantidade,
                valor = reserva.valor,
                descricao = reserva.descricao,
                tipo = TipoTransacao.SAIDA
            )

            cliente.saldo_milhas -= ((quantidade - (reserva.valor / 5))).toFloat()
            val clienteAtualizado = repository.save(cliente)
            val transacao = transacaoRepository.save(nova_transacao)

            return ExtratoDTO(
                clienteAtualizado.codigo,
                clienteAtualizado.saldo_milhas,
                listOf(TransacaoMapper.toDTO(transacao))
            )
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: ${reserva.codigo_cliente}")
    }

    fun reembolsarReserva(reserva: ReservaOutputDTO): ClienteOutputDTO {
        repository.findByCodigoAndAtivoTrue(reserva.codigo_cliente)?.let { cliente ->
            val quantidade = reserva.quantidade_milhas

            val nova_transacao = Transacao(
                cliente = cliente,
                codigo_reserva = reserva.codigo,
                data = reserva.data,
                quantidade_milhas = quantidade,
                valor = 0.0,
                descricao = "REEMBOLSO",
                tipo = TipoTransacao.ENTRADA
            )

            transacaoRepository.save(nova_transacao)
            cliente.saldo_milhas += quantidade

            return ClienteMapper.toDTO(repository.save(cliente))
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: ${reserva.codigo_cliente}")
    }

    fun reembolsarVoo(reservas: List<ReservaOutputDTO>) {
        reservas.forEach { reserva ->
            repository.findByCodigoAndAtivoTrue(reserva.codigo_cliente)?.let { cliente ->
                val quantidade = reserva.quantidade_milhas

                val nova_transacao = Transacao(
                    cliente = cliente,
                    codigo_reserva = reserva.codigo,
                    data = reserva.data,
                    quantidade_milhas = quantidade,
                    valor = 0.0,
                    descricao = "REEMBOLSO",
                    tipo = TipoTransacao.ENTRADA
                )

                transacaoRepository.save(nova_transacao)
                cliente.saldo_milhas += quantidade
                repository.save(cliente)
            }
        }
    }

    fun emitirExtrato(codigo: Long): ExtratoDTO {
        repository.findByCodigoAndAtivoTrue(codigo)?.let { data ->
            val transacoes = transacaoRepository.findByCliente(data)

            return ExtratoDTO(data.codigo, data.saldo_milhas, transacoes.map { TransacaoMapper.toDTO(it) })
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: $codigo")
    }
}