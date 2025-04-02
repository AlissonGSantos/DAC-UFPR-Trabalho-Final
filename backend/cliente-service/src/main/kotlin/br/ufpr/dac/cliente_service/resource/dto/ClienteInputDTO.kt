package br.ufpr.dac.cliente_service.resource.dto

import br.ufpr.dac.cliente_service.domain.Cliente
import jakarta.validation.constraints.*

data class ClienteInputDTO(
  val codigo: Long,

  @NotBlank
  val nome: String,

  @Cpf
  val cpf: String,

  @NotBlank
  @Email
  val email: String,

  @NotBlank
  @Pattern(regexp = "\\d{10,11}", message = "O telefone deve ter entre 10 e 11 digitos")
  val telefone: String
) {
  fun toCliente(): Cliente {
    return Cliente(cpf = cpf, nome = nome, email = email, telefone = telefone, ativo = true)
  }
}
