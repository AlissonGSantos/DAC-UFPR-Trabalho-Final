package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario


class FuncionarioMapper {
    companion object {
        fun toDTO(funcionario: Funcionario): FuncionarioDTO {
            return FuncionarioDTO(
                funcionario.codigo,
                funcionario.nome,
                funcionario.cpf,
                funcionario.email,
                funcionario.telefone
            )
        }

        fun toDomain(funcionario: FuncionarioDTO): Funcionario {
            return Funcionario(
                funcionario.codigo,
                funcionario.cpf,
                funcionario.nome,
                funcionario.email,
                funcionario.telefone,
                true
            )
        }
    }
}