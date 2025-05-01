package utils.dto

import java.time.ZonedDateTime

data class ReservaUpdateEstadoDTO(
    val codigo: String,
    val estado: String,
    val data: ZonedDateTime
)