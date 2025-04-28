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
import utils.exceptions.ResourceNotFoundException
import java.time.ZonedDateTime

@Service
class MilhasService(
    private val repository: IClienteRepository,
    private val transacaoRepository: ITransacaoRepository
) {

    fun comprarMilhas(codigo: Long, milhas: MilhasCompraDTO): ClienteOutputDTO {
        val cliente = repository.findByCodigoAndAtivoTrue(codigo)

        cliente?.let {
            val quantidade = milhas.quantidade

            val nova_transacao = Transacao(
                cliente = it,
                codigo_reserva = null,
                data = ZonedDateTime.now(),
                quantidade_milhas = quantidade,
                valor = quantidade * 5.0,
                descricao = "COMPRA DE MILHAS",
                tipo = TipoTransacao.ENTRADA
            )

            transacaoRepository.save(nova_transacao)
            it.saldo_milhas += quantidade

            return ClienteMapper.toDTO(repository.save(it))
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: $codigo")
    }

    fun registrarReserva(reserva: ReservaCreationResponseDTO): ExtratoDTO {
        val cliente = repository.findByCodigoAndAtivoTrue(reserva.codigo_cliente)

        cliente?.let {
            val quantidade = reserva.quantidade_milhas

            val nova_transacao = Transacao(
                cliente = it,
                codigo_reserva = reserva.codigo_reserva,
                data = reserva.data,
                quantidade_milhas = quantidade,
                valor = reserva.valor,
                descricao = reserva.descricao,
                tipo = TipoTransacao.SAIDA
            )

            it.saldo_milhas -= quantidade
            val clienteAtualizado = repository.save(it)
            val transacao = transacaoRepository.save(nova_transacao)

            return ExtratoDTO(
                clienteAtualizado.codigo,
                clienteAtualizado.saldo_milhas,
                listOf(TransacaoMapper.toDTO(transacao))
            )
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: ${reserva.codigo_cliente}")
    }

    fun emitirExtrato(codigo: Long): ExtratoDTO {
        val cliente = repository.findByCodigoAndAtivoTrue(codigo)

        cliente?.let { data ->
            val transacoes = transacaoRepository.findByCliente(data)

            return ExtratoDTO(data.codigo, data.saldo_milhas, transacoes.map { TransacaoMapper.toDTO(it) })
        }

        throw ResourceNotFoundException("Cliente não encontrado com o ID: $codigo")
    }
}