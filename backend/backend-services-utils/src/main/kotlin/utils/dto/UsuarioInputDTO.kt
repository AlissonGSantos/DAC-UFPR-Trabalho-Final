package utils.dto

data class UsuarioInputDTO (
    val codigo: Long,
    val email: String,
    var senha: String?,
    val role: UsuarioRole
)