package br.ufpr.dac.cliente_service.service

import br.ufpr.dac.cliente_service.repository.IClienteRepository


@Service
class ClienteService(private val repository: IClienteRepository){

  fun getAllClientes(): List<ClienteOutputDTO> {
    return repository.findByAtivoTrue().map {ClienteOutputDTO(it)}
  }

  fun updateCliente(codigo: Long, clienteDTO: ClienteInputDTO): Cliente{
    val cliente = repository.findById(codigo)
      .orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: ${clienteDTO.codigo}")}

    cliente.nome = clienteDTO.nome
    cliente.email = clienteDTO.email
    cliente.telefone = clienteDTO.telefone

    return repository.save(cliente)
  }

  fun saveCliente(cliente: ClienteInputDTO): Cliente {
    return repository.save(cliente.toCliente())
  }

  fun deactivateCliente(codigo: Long): Cliente {
    val cliente = repository.findById(codigo).orElseThrow{ IllegalArgumentException("Cliente não encontrado com o ID: $codigo") }

    cliente.ativo = false
    return repository.save(cliente)
  }

  fun getClienteByID(codigo: Long) : ClienteOutputDTO {
    return repository.findById(codigo) {ClienteOutputDTO(it)}
  }

}
