package utils.dto

data class FuncionarioOutputDTO(
    val codigo: Long,
    val cpf: String,
    val nome: String,
    val email: String,
    val telefone: String
) : UsuarioOutputDTO
