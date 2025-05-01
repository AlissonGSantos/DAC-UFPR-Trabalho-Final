package utils.dto

import java.time.ZonedDateTime

data class ReservaCreationResponseDTO(
    val data: ZonedDateTime,
    val codigo_reserva: String,
    val estado_reserva: String,
    val codigo_cliente: Long,
    val poltronas: List<Int>,
    val quantidade_milhas: Float,
    val descricao: String,
    val valor: Double
)