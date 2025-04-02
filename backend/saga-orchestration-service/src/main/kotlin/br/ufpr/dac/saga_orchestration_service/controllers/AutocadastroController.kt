package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.dto.ClienteCadastro
import br.ufpr.dac.saga_orchestration_service.services.AutocadastroSaga
import kotlinx.coroutines.runBlocking
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.CompletableFuture

@RestController
class AutocadastroController(private val saga: AutocadastroSaga) {

    @PostMapping("/clientes")
    fun autocadastro(@RequestBody body: ClienteCadastro): CompletableFuture<String> {
        return CompletableFuture.supplyAsync {
            runBlocking {
                saga.executeSaga(body)
            }
        }
    }

}