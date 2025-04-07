package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.domain.TipoTransacao
import br.ufpr.dac.cliente_service.domain.Transacao
import br.ufpr.dac.cliente_service.repository.IClienteRepository
import br.ufpr.dac.cliente_service.repository.ITransacaoRepository
import br.ufpr.dac.cliente_service.resource.dto.ExtratoDTO
import br.ufpr.dac.cliente_service.resource.dto.MilhasCompraDTO
import br.ufpr.dac.cliente_service.resource.mapper.ClienteMapper
import br.ufpr.dac.cliente_service.resource.mapper.TransacaoMapper
import org.springframework.stereotype.Service
import utils.dto.ClienteOutputDTO
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

        throw IllegalArgumentException("Cliente não encontrado com o ID: $codigo")
    }

    fun emitirExtrato(codigo: Long): ExtratoDTO {
        val cliente = repository.findByCodigoAndAtivoTrue(codigo)

        cliente?.let { data ->
            val transacoes = transacaoRepository.findByCliente(data)

            return ExtratoDTO(data.codigo, data.saldo_milhas, transacoes.map { TransacaoMapper.toDTO(it) })
        }

        throw IllegalArgumentException("Cliente não encontrado com o ID: $codigo")
    }
}