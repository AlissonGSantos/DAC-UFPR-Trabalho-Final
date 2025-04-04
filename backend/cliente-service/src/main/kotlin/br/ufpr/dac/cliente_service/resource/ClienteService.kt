package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.repository.IClienteRepository
import utils.dto.ClienteOutputDTO
import utils.dto.ClienteInputDTO
import br.ufpr.dac.cliente_service.resource.mapper.ClienteMapper
import br.ufpr.dac.cliente_service.resource.mapper.EnderecoMapper
import org.springframework.stereotype.Service


@Service
class ClienteService(private val repository: IClienteRepository){

  fun getAllClientes(): List<ClienteOutputDTO> {
    return repository.findByAtivoTrue().map { ClienteMapper.toDTO(it) }
  }

  fun updateCliente(codigo: Long, clienteDTO: ClienteInputDTO): ClienteOutputDTO {
    val cliente = repository.findByCodigoAndAtivoTrue(codigo)

    cliente?.let {
      it.nome = clienteDTO.nome
      it.email = clienteDTO.email
      it.saldo_milhas = clienteDTO.saldo_milhas
      it.endereco = EnderecoMapper.toDomain(clienteDTO.endereco)

      return ClienteMapper.toDTO(repository.save(it))
    }

    throw IllegalArgumentException("Cliente não encontrado com o ID: ${clienteDTO.codigo}")
  }

  fun saveCliente(cliente: ClienteInputDTO): ClienteOutputDTO {
    val registry = repository.save(ClienteMapper.toDomain(cliente))
    return ClienteMapper.toDTO(registry)
  }

  fun deactivateCliente(codigo: Long): ClienteOutputDTO {
    val cliente = repository.findByCodigoAndAtivoTrue(codigo)

    cliente?.let {
      it.ativo = false
      return ClienteMapper.toDTO(repository.save(it))
    }

    throw IllegalArgumentException("Cliente não encontrado com o ID: $codigo")
  }

  fun getClienteByID(codigo: Long) : ClienteOutputDTO {
    val cliente = repository.findByCodigoAndAtivoTrue(codigo)

    cliente?.let {
      return ClienteMapper.toDTO(it)
    }

    throw IllegalArgumentException("Cliente não encontrado com o ID: $codigo")
  }

}
