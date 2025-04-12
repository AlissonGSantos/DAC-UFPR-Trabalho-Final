package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.services.AutocadastroSaga
import jakarta.validation.Valid
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import utils.dto.ClienteInputDTO
import utils.dto.ClienteOutputDTO
import java.net.URI

@RestController
class AutocadastroController(private val saga: AutocadastroSaga) {

    @PostMapping("/clientes")
    @CrossOrigin
    fun autocadastro(@RequestBody @Valid body: ClienteInputDTO): ResponseEntity<ClienteOutputDTO> {
        val cliente = runBlocking {
            saga.executeSaga(body)
        }

       return ResponseEntity.created(URI("/clientes/${cliente.codigo}")).body(cliente)
    }

}