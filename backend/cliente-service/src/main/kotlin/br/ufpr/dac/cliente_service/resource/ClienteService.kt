package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.repository.IClienteRepository
import utils.dto.ClienteOutputDTO
import br.ufpr.dac.cliente_service.resource.dto.ClienteInputDTO
import br.ufpr.dac.cliente_service.resource.dto.ClienteMapper
import org.springframework.stereotype.Service


@Service
class ClienteService(private val repository: IClienteRepository){

  fun getAllClientes(): List<ClienteOutputDTO> {
    return repository.findAll().map { ClienteMapper.toDTO(it) }
  }

  fun updateCliente(codigo: Long, clienteDTO: ClienteInputDTO): ClienteOutputDTO {
    val cliente = repository.findById(codigo)
      .orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: ${clienteDTO.codigo}")}

    cliente.nome = clienteDTO.nome
    cliente.email = clienteDTO.email
    cliente.saldo_milhas = clienteDTO.saldo_milhas
    cliente.endereco = clienteDTO.endereco

    return ClienteMapper.toDTO(repository.save(cliente))
  }

  fun saveCliente(cliente: ClienteInputDTO): ClienteOutputDTO {
    return ClienteMapper.toDTO(repository.save(cliente.toCliente()))
  }

  fun deactivateCliente(codigo: Long): ClienteOutputDTO {
    val cliente = repository.findById(codigo).orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: $codigo") }
    repository.deleteById(cliente.codigo)
    return ClienteMapper.toDTO(cliente)
  }

  fun getClienteByID(codigo: Long) : ClienteOutputDTO {
    val cliente = repository.findById(codigo).orElseThrow { IllegalArgumentException("Cliente não encontrado com o ID: $codigo")}
    return ClienteMapper.toDTO(cliente)
  }

}
