package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.domain.Cliente
import br.ufpr.dac.cliente_service.repository.IClienteRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.PutMapping

@RestController
@RequestMapping("/clientes")
class ClienteController(private val repository: IClienteRepository) {

    @GetMapping
    fun getClientes(): List<Cliente>{
        return repository.findAll()
    }
    
    @DeleteMapping("/{id}")
    fun deleteCliente(@PathVariable id: Long){
      return repository.deleteById(id)
    }

    @GetMapping("/{id}")
    fun getClienteById(@PathVariable id: Long) : Cliente{
      return repository.findById(id).orElseThrow {
        RuntimeException ("Cliente não encontrado com o id : $id")
      }
    }

    @PostMapping
    fun createCliente(@RequestBody cliente: Cliente): Cliente{
      return repository.save(cliente)
    }
    
    @PutMapping("/{id}")
    fun updateCliente(@PathVariable id: Long, @RequestBody cliente: Cliente): Cliente{
      var existingCliente = repository.findById(id).orElseThrow {
        RuntimeException("Cliente não encontrado com o id: $id")
      }

      existingCliente.nome = cliente.nome
      existingCliente.email = cliente.email
      existingCliente.endereco = cliente.endereco

      return repository.save(existingCliente)
    }
  }
