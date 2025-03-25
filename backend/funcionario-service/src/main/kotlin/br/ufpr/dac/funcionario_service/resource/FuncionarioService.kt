package br.ufpr.dac.funcionario_service.service

import br.ufpr.dac.funcionario_service.domain.Funcionario
import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioInputDTO
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioOutputDTO
import org.springframework.stereotype.Service

@Service
class FuncionarioService(private val repository: IFuncionarioRepository) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findAll().map { FuncionarioOutputDTO(it) }
    }

    fun updateFuncionario(codigo: Long, funcionarioDTO: FuncionarioInputDTO): Funcionario {
        val funcionario = repository.findById(codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}") }

        funcionario.nome = funcionarioDTO.nome
        funcionario.email = funcionarioDTO.email
        funcionario.telefone = funcionarioDTO.telefone

        return repository.save(funcionario)
    }

    fun saveFuncionario(funcionario: FuncionarioInputDTO): Funcionario {
        return repository.save(funcionario.toFuncionario())
    }
}
