package utils.dto

import jakarta.validation.constraints.*
import utils.validators.Cpf

data class ClienteInputDTO(
  val codigo: Long?,

  @NotBlank
  val nome: String,

  @Cpf
  val cpf: String,

  @NotBlank
  @Email
  val email: String,

  val saldo_milhas: Float,

  @NotNull
  val endereco: EnderecoDTO
)
