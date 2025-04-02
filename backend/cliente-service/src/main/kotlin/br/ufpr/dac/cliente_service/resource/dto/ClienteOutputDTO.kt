package br.ufpr.dac.cliente_service.resource.dto

import br.ufpr.dac.cliente_service.domain.Endereco
import br.ufpr.dac.cliente_service.domain.Cliente
import utils.dto.UsuarioOutputDTO

class ClienteOutputDTO (
  val codigo: Long,
  cpf: String,
  nome: String,
  email:String,
  val saldo_milhas: Float,
  val endereco: Endereco
) : UsuarioOutputDTO(cpf, nome, email) {
  constructor(cliente: Cliente): this (
    codigo = cliente.codigo,
    cpf = cliente.cpf,
    nome = cliente.nome,
    email = cliente.email,
    saldo_milhas = cliente.saldo_milhas,
    endereco = cliente.endereco
  )

  fun toCliente(): Cliente{
    return Cliente(codigo, cpf, nome, email, saldo_milhas, endereco)
  }
}
