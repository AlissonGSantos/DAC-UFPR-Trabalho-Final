package br.ufpr.dac.reserva_service.resource.dto

import java.time.ZonedDateTime

data class ReservaConsultaInputDTO(
    val codigo: String,
    val poltrona: Int,
    val codigo_cliente: Long,
    val codigo_voo: String,
    val estado: String,
    val data: ZonedDateTime,
    val quantidade_milhas: Double
)
