package br.ufpr.dac.cliente_service.service

import br.ufpr.dac.cliente_service.repository.IClienteRepository
import br.ufpr.dac.cliente_service.resource.dto.ClienteOutputDTO
import br.ufpr.dac.cliente_service.resource.dto.ClienteInputDTO
import br.ufpr.dac.cliente_service.domain.Cliente
import org.springframework.stereotype.Service


@Service
class ClienteService(private val repository: IClienteRepository){

  fun getAllClientes(): List<ClienteOutputDTO> {
    return repository.findAll().map {ClienteOutputDTO(it)}
  }

  fun updateCliente(codigo: Long, clienteDTO: ClienteInputDTO): Cliente{
    val cliente = repository.findById(codigo)
      .orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: ${clienteDTO.codigo}")}

    cliente.nome = clienteDTO.nome
    cliente.email = clienteDTO.email
    cliente.saldo_milhas = clienteDTO.saldo_milhas
    cliente.endereco = clienteDTO.endereco

    return repository.save(cliente)
  }

  fun saveCliente(cliente: ClienteInputDTO): Cliente {
    return repository.save(cliente.toCliente())
  }

  fun deactivateCliente(codigo: Long): Cliente {
    val cliente = repository.findById(codigo).orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: $codigo") }
    repository.deleteById(cliente.codigo)
    return cliente
  }

  fun getClienteByID(codigo: Long) : ClienteOutputDTO {
    val cliente = repository.findById(codigo).orElseThrow { IllegalArgumentException("Cliente não encontrado com o ID: $codigo")}
    return ClienteOutputDTO(cliente)
  }

}
