package utils.dto

import java.time.ZonedDateTime

data class ReservaOutputDTO(
    val codigo: String,
    val data: ZonedDateTime,
    val estado: String,
    val quantidade_milhas: Float,
    val codigo_cliente: Long,
    val saldo_cliente: Float,
    val poltronas_reservadas: List<Int>?,
    val voo: VooOutputDTO
)