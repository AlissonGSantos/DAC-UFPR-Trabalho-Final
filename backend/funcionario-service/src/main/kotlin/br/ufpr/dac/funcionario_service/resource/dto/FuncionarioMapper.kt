package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario
import utils.dto.FuncionarioOutputDTO

class FuncionarioMapper {
    companion object {
        fun toDTO(funcionario: Funcionario): FuncionarioOutputDTO {
            return FuncionarioOutputDTO(
                funcionario.codigo,
                funcionario.cpf,
                funcionario.nome,
                funcionario.email,
                funcionario.telefone
            )
        }

        fun toDomain(funcionario: FuncionarioOutputDTO): Funcionario {
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