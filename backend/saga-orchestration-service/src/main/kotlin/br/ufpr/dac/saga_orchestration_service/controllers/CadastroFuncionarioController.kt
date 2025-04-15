package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.services.CadastroFuncionarioSaga
import jakarta.validation.Valid
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import utils.dto.FuncionarioOutputDTO
import utils.dto.FuncionarioInputDTO
import java.net.URI

@RestController
class CadastroFuncionarioController (private val saga: CadastroFuncionarioSaga) {
    @PostMapping("/funcionarios")
    @CrossOrigin
    fun cadastrarFuncionario (@RequestBody @Valid body: FuncionarioInputDTO): ResponseEntity<FuncionarioOutputDTO> {
        val funcionario = runBlocking {
            saga.executeSaga(body)
        }

        return ResponseEntity.created(URI("/funcionarios/${funcionario.codigo}")).body(funcionario)
    }
}