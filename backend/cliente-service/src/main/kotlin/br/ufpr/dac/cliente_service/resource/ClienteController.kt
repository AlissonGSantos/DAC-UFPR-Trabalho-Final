package br.ufpr.dac.cliente_service.resource

import br.ufpr.dac.cliente_service.domain.Cliente
import br.ufpr.dac.cliente_service.repository.IClienteRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/clientes")
class ClienteController(private val repository: IClienteRepository) {

    @GetMapping
    fun getClientes(): List<Cliente>{
        return repository.findAll()
    }

}