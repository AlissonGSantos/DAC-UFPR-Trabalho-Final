package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioMapper
import utils.dto.FuncionarioOutputDTO
import org.springframework.stereotype.Service
import utils.dto.ClienteInputDTO
import utils.dto.ClienteOutputDTO
import utils.dto.FuncionarioInputDTO
import utils.exceptions.ResourcesConflictException

@Service
class FuncionarioService(private val repository: IFuncionarioRepository) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findByAtivoTrue().map { FuncionarioMapper.toDTO(it) }
    }

    fun updateFuncionario(codigo: Long, funcionarioDTO: FuncionarioInputDTO): FuncionarioOutputDTO {
        val funcionario = repository.findByCodigoAndAtivoTrue(codigo)

        funcionario?.let {
            it.nome = funcionarioDTO.nome
            it.email = funcionarioDTO.email
            it.telefone = funcionarioDTO.telefone
            return FuncionarioMapper.toDTO(repository.save(it))
        }

        throw IllegalArgumentException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}")
    }

    fun saveFuncionario(funcionario: FuncionarioInputDTO): FuncionarioOutputDTO {
        try {
            val registry = repository.save(FuncionarioMapper.toDomain(funcionario))
            return FuncionarioMapper.toDTO(registry)
        } catch (ex: Exception) {
            throw ResourcesConflictException("Usuário duplicado")
        }
    }

    fun deactivateFuncionario(codigo: Long): FuncionarioOutputDTO {
        val funcionario = repository.findByCodigoAndAtivoTrue(codigo)

        funcionario?.let {
            it.ativo = false
            return FuncionarioMapper.toDTO(repository.save(it))
        }

        throw IllegalArgumentException("Funcionário não encontrado com o ID: $codigo")
    }

    fun getFuncionarioById(codigo: Long): FuncionarioOutputDTO {
        val funcionario = repository.findByCodigoAndAtivoTrue(codigo)

        funcionario?.let {
            return FuncionarioMapper.toDTO(it)
        }

        throw IllegalArgumentException("Funcionário não encontrado com o ID: $codigo")
    }
}
