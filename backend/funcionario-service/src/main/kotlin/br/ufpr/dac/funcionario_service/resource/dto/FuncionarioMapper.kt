package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario
import utils.dto.FuncionarioInputDTO
import utils.dto.FuncionarioOutputDTO


class FuncionarioMapper {
    companion object {
        fun toDTO(funcionario: Funcionario): FuncionarioOutputDTO {
            return FuncionarioOutputDTO(
                funcionario.codigo,
                funcionario.cpf,
                funcionario.nome,
                funcionario.email,
                funcionario.telefone,
                funcionario.ativo
            )
        }

        fun toDomain(funcionario: FuncionarioInputDTO): Funcionario {
            return Funcionario(
                funcionario.codigo,
                funcionario.cpf,
                funcionario.nome,
                funcionario.email,
                funcionario.telefone,
                funcionario.ativo ?: true
            )
        }
    }
}