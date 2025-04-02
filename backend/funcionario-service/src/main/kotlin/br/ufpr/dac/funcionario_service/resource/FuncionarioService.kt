package br.ufpr.dac.funcionario_service.service

import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioInputDTO
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioMapper
import utils.dto.FuncionarioOutputDTO
import org.springframework.stereotype.Service

@Service
class FuncionarioService(private val repository: IFuncionarioRepository) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findByAtivoTrue().map { FuncionarioMapper.toDTO(it) }
    }

    fun updateFuncionario(codigo: Long, funcionarioDTO: FuncionarioInputDTO): FuncionarioOutputDTO {
        val funcionario = repository.findById(codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}") }

        funcionario.nome = funcionarioDTO.nome
        funcionario.email = funcionarioDTO.email
        funcionario.telefone = funcionarioDTO.telefone

        return FuncionarioMapper.toDTO(repository.save(funcionario))
    }

    fun saveFuncionario(funcionario: FuncionarioInputDTO): FuncionarioOutputDTO {
        return FuncionarioMapper.toDTO(repository.save(funcionario.toFuncionario()))
    }

    fun deactivateFuncionario(codigo: Long): FuncionarioOutputDTO {
        val funcionario = repository.findById(codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: $codigo") }

        funcionario.ativo = false
        return FuncionarioMapper.toDTO(repository.save(funcionario))
    }
}
