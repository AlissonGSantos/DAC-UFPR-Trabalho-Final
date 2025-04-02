package br.ufpr.dac.cliente_service.resource.dto

import br.ufpr.dac.cliente_service.domain.Cliente
import br.ufpr.dac.cliente_service.domain.Endereco
import jakarta.validation.constraints.*
import utils.validators.Cpf

data class ClienteInputDTO(
  val codigo: Long,

  @NotBlank
  val nome: String,

  @Cpf
  val cpf: String,

  @NotBlank
  @Email
  val email: String,

  val saldo_milhas: Float,

  val endereco: Endereco
) {
  fun toCliente(): Cliente {
    return Cliente(cpf = cpf, nome = nome, email = email, saldo_milhas = saldo_milhas, endereco = endereco, codigo = codigo)
  }
}
