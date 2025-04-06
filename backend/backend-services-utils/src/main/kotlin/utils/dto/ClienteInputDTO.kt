package utils.dto

import jakarta.validation.Valid
import jakarta.validation.constraints.*
import utils.validators.Cpf

data class ClienteInputDTO(
  val codigo: Long?,

  @field:NotBlank
  val nome: String,

  @field:Cpf
  val cpf: String,

  @field:Email
  @field:NotBlank
  val email: String,

  val saldo_milhas: Float,

  @field:Valid
  @field:NotNull
  val endereco: EnderecoDTO
)
