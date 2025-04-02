package br.ufpr.dac.cliente_service.resource

import org.springframework.http.ResponseEntity
import br.ufpr.dac.cliente_service.domain.Cliente
import br.ufpr.dac.cliente_service.repository.IClienteRepository
import br.ufpr.dac.cliente_service.service.ClienteService
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/clientes")
class ClienteController(private val service: ClienteService) {

    @GetMapping
    fun getClientes(): ResponseEntity<List<ClienteOutputDTO>>{
        val clientes = service.getAllClientes()
        return ResponseEntity.ok().body(clientes)
    }
    
    @DeleteMapping("/{id}")
    fun deleteCliente(@PathVariable id: Long): ResponseEntity<ClienteOutputDTO>{
      val deactivatedCliente = service.deactivateCliente(id)
      return ResponseEntity.ok(ClienteOutputDTO(deactivatedCliente))
    }

    @GetMapping("/{id}")
    fun getClienteById(@PathVariable id: Long) : ResponseEntity<ClienteOutputDTO>{
      val cliente = service.getClienteByID(id)
      return ResponseEntity.ok(ClienteOutputDTO(cliente))
    }

    @PostMapping
    fun createCliente(@RequestBody cliente: ClienteInputDto): ResponseEntity<ClienteOutputDTO>{
      val savedCliente =  service.saveCliente(cliente)
      return ResponseEntity.status(HttpStatus.CREATED).body(ClienteOutputDTO(savedCliente))
    }
    
    @PutMapping("/{id}")
    fun updateCliente(@PathVariable id: Long, @RequestBody clienteDTO: ClienteInputDto): ResponseEntity<ClienteOutputDTO>{
      val updatedCliente = service.updateCliente(id, clienteDTO)
      return ResponseEntity.ok().body(ClienteOutputDTO(updatedCliente))
    }
  }
