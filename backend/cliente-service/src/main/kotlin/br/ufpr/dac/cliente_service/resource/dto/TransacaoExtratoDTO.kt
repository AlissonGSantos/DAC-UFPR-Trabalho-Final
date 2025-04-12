package br.ufpr.dac.cliente_service.resource.dto

import br.ufpr.dac.cliente_service.domain.TipoTransacao
import java.time.ZonedDateTime

data class TransacaoExtratoDTO (
    val data: ZonedDateTime,
    val quantidade_milhas: Float,
    val valor: Double,
    val descricao: String,
    val tipo: String
)