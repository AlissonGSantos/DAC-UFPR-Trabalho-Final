package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario

data class FuncionarioOutputDTO(
    val codigo: Long? = null,
    val cpf: String,
    val nome: String,
    val email: String,
    val telefone: String
) {
    constructor(funcionario: Funcionario) : this(
        codigo = funcionario.codigo,
        cpf = funcionario.cpf,
        nome = funcionario.nome,
        email = funcionario.email,
        telefone = funcionario.telefone
    )
}
