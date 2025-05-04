package utils.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import utils.validators.Cpf

data class FuncionarioInputDTO(
    val codigo: Long = 0L,
    @NotBlank
    @Cpf
    val cpf: String,
    @NotBlank
    @Email
    val email: String,
    @NotBlank
    val nome: String,
    val telefone: String,
    val senha: String?
)
