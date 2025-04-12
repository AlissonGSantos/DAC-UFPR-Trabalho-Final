package br.ufpr.dac.cliente_service.resource.mapper

import br.ufpr.dac.cliente_service.domain.Transacao
import br.ufpr.dac.cliente_service.resource.dto.TransacaoExtratoDTO

class TransacaoMapper {
    companion object {
        fun toDTO(transacao: Transacao): TransacaoExtratoDTO {
            return TransacaoExtratoDTO(
                transacao.data, transacao.quantidade_milhas, transacao.valor, transacao.descricao, transacao.tipo.toString()
            )
        }
    }
}