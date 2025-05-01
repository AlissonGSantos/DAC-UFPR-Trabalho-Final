package utils.dto

import java.time.ZonedDateTime

data class VooOutputDTO(
    val codigo: String,
    val data: ZonedDateTime,
    val valor_passagem: Double,
    val quantidade_poltronas_total: Int,
    val quantidade_poltronas_ocupadas: Int,
    val estado: String,
    val aeroporto_origem: AeroportoOutputDTO,
    val aeroporto_destino: AeroportoOutputDTO
)