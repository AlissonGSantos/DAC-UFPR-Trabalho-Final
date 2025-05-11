package utils.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import utils.validators.Cpf

data class FuncionarioInputDTO(
    val codigo: Long = 0L,
    @field:NotBlank
    @field:Cpf
    val cpf: String,
    @field:NotBlank
    @field:Email
    val email: String,
    @field:NotBlank
    val nome: String,
    val telefone: String,
    val senha: String?,
    val ativo: Boolean?
)
