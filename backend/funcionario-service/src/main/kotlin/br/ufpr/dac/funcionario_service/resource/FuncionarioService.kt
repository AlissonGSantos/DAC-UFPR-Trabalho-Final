package br.ufpr.dac.funcionario_service.service

import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioDTO
import utils.dto.FuncionarioOutputDTO
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioMapper
import org.springframework.stereotype.Service

@Service
class FuncionarioService(private val repository: IFuncionarioRepository) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findByAtivoTrue().map { FuncionarioMapper.toDTO(it) }
    }

    fun getFuncionarioById(id: Long): FuncionarioDTO {
        return repository.findByIdAndAtivoTrue(id)
            .map { FuncionarioMapper.toDTO(it) }
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: ${id}") }
    }

    fun updateFuncionario(codigo: Long, funcionarioDTO: FuncionarioDTO): FuncionarioDTO {
        val funcionario = repository.findById(codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}") }

        funcionario.nome = funcionarioDTO.nome
        funcionario.email = funcionarioDTO.email
        funcionario.telefone = funcionarioDTO.telefone

        return FuncionarioMapper.toDTO(repository.save(funcionario))
    }

    fun saveFuncionario(funcionario: FuncionarioDTO): FuncionarioDTO {
        return FuncionarioMapper.toDTO(repository.save(funcionario.toFuncionario()))
    }

    fun deactivateFuncionario(codigo: Long): FuncionarioDTO {
        val funcionario = repository.findById(codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: $codigo") }

        funcionario.ativo = false
        return FuncionarioMapper.toDTO(repository.save(funcionario))
    }
}
