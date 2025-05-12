package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.sagas.AutocadastroSaga
import br.ufpr.dac.saga_orchestration_service.sagas.CadastroFuncionarioSaga
import jakarta.validation.Valid
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import utils.dto.ClienteInputDTO
import utils.dto.ClienteOutputDTO
import utils.dto.FuncionarioInputDTO
import utils.dto.FuncionarioOutputDTO
import java.net.URI
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("/v1")
@CrossOrigin(origins = ["\${gateway.url}"])
class CadastroController(
    private val autocadastroSaga: AutocadastroSaga,
    private val cadastroFuncionarioSaga: CadastroFuncionarioSaga
) {

    @PostMapping("/clientes")
    fun autocadastro(@RequestBody @Valid body: ClienteInputDTO): ResponseEntity<ClienteOutputDTO> {
        val cliente = runBlocking {
            autocadastroSaga.executeSaga(body)
        }

        return ResponseEntity.created(URI("/clientes/${cliente.codigo}")).body(cliente)
    }

    @PostMapping("/funcionarios")
    fun cadastrarFuncionario (@RequestBody @Valid body: FuncionarioInputDTO): ResponseEntity<FuncionarioOutputDTO> {
        val funcionario = runBlocking {
            cadastroFuncionarioSaga.executeSaga(body)
        }

        return ResponseEntity.created(URI("/funcionarios/${funcionario.codigo}")).body(funcionario)
    }

}