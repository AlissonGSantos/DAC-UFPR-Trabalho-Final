package utils.dto

data class ExtratoDTO (
    val codigo: Long,
    val saldo_milhas: Float,
    val transacoes: List<TransacaoExtratoDTO>
)
