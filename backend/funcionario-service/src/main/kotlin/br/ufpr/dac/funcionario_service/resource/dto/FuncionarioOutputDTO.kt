package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario
import utils.dto.UsuarioOutputDTO

class FuncionarioOutputDTO(
    val codigo: Long,
    cpf: String,
    nome: String,
    email: String,
    val telefone: String
) : UsuarioOutputDTO(cpf, nome, email) {
    constructor(funcionario: Funcionario) : this(
        codigo = funcionario.codigo,
        cpf = funcionario.cpf,
        nome = funcionario.nome,
        email = funcionario.email,
        telefone = funcionario.telefone
    )

    fun toFuncionario(): Funcionario {
        return Funcionario(codigo, cpf, nome, email, telefone, ativo = true)
    }
}
