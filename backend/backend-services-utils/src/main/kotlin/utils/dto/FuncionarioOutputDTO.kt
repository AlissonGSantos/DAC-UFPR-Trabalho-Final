package utils.dto

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class FuncionarioOutputDTO(
    val codigo: Long,
    val cpf: String,
    val nome: String,
    val email: String,
    val telefone: String,
    val senha: String?
) : UsuarioOutputDTO
