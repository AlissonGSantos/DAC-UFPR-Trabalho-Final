package br.ufpr.dac.cliente_service.resource.dto

import com.fasterxml.jackson.annotation.JsonInclude
import java.time.ZonedDateTime

@JsonInclude(JsonInclude.Include.NON_NULL)
data class TransacaoExtratoDTO (
    val data: ZonedDateTime,
    val codigo_reserva: String?,
    val quantidade_milhas: Float,
    val valor: Double,
    val descricao: String,
    val tipo: String
)