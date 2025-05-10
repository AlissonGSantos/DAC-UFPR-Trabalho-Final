package utils.dto

data class ReservaTransactionDTO(
    val valor: Double,
    val milhas_utilizadas: Double,
    val quantidade_poltronas: Int,
    val poltronas_reservadas: List<Int>?,
    val codigo_cliente: Long,
    val voo: VooOutputDTO
)
