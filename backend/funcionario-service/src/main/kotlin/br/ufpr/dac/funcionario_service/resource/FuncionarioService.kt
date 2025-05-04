package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioMapper
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Qualifier
import utils.dto.FuncionarioOutputDTO
import org.springframework.stereotype.Service
import utils.dto.FuncionarioInputDTO
import utils.exceptions.ResourceNotFoundException
import utils.exceptions.ResourcesConflictException

@Service
class FuncionarioService(
    private val repository: IFuncionarioRepository,
    private val template: RabbitTemplate,
    @Qualifier("deactivateFuncionario") val exchange: DirectExchange
) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findByAtivoTrue().map { FuncionarioMapper.toDTO(it) }
    }

    fun updateFuncionario(codigo: Long, funcionarioDTO: FuncionarioInputDTO): FuncionarioOutputDTO {
        repository.findByCodigoAndAtivoTrue(codigo)?.let { funcionario ->
            funcionario.nome = funcionarioDTO.nome
            funcionario.email = funcionarioDTO.email
            funcionario.telefone = funcionarioDTO.telefone

            return FuncionarioMapper.toDTO(repository.save(funcionario))
        }

        throw ResourceNotFoundException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}")
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
        repository.findByCodigoAndAtivoTrue(codigo)?.let { funcionario ->
            funcionario.ativo = false
            template.convertAndSend(exchange.name, "funcionario", codigo.toString())
            return FuncionarioMapper.toDTO(repository.save(funcionario))
        }

        throw ResourceNotFoundException("Funcionário não encontrado com o ID: $codigo")
    }

    fun getFuncionarioById(codigo: Long): FuncionarioOutputDTO {
        repository.findByCodigoAndAtivoTrue(codigo)?.let { funcionario ->
            return FuncionarioMapper.toDTO(funcionario)
        }

        throw ResourceNotFoundException("Funcionário não encontrado com o ID: $codigo")
    }
}
