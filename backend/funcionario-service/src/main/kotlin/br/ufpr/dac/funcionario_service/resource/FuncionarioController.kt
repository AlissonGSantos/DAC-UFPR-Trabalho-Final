package br.ufpr.dac.funcionario_service.resource

import utils.dto.FuncionarioOutputDTO
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.DeleteMapping
import utils.dto.FuncionarioInputDTO
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("/v1/funcionarios")
@CrossOrigin(origins = ["\${gateway.url}"])
class FuncionarioController(private val service: FuncionarioService) {

    @GetMapping
    fun getFuncionarios(): ResponseEntity<List<FuncionarioOutputDTO>> {
        val funcionarios = service.getAllFuncionarios()
        return ResponseEntity.ok().body(funcionarios)
    }

    @GetMapping("/{id}")
    fun getFuncionarioById(@PathVariable id: Long): ResponseEntity<FuncionarioOutputDTO> {
        val funcionario = service.getFuncionarioById(id)
        return ResponseEntity.ok().body(funcionario)
    }

    @PutMapping("/{id}")
    fun updateFuncionario(
        @Valid @RequestBody funcionario: FuncionarioInputDTO, @PathVariable id: Long
    ): ResponseEntity<FuncionarioOutputDTO> {
        val updatedFuncionario = service.updateFuncionario(id, funcionario)
        return ResponseEntity.ok().body(updatedFuncionario)
    }

    @PostMapping
    fun createFuncionario(@Valid @RequestBody funcionario: FuncionarioInputDTO): ResponseEntity<FuncionarioOutputDTO> {
        return try {
            val savedFuncionario = service.saveFuncionario(funcionario)
            ResponseEntity.status(HttpStatus.CREATED).body(savedFuncionario)
        } catch (e: IllegalArgumentException) {
            // Caso de erro de CPF inválido
            throw IllegalArgumentException(e.message)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteFuncionario(@PathVariable id: Long): ResponseEntity<FuncionarioOutputDTO> {
        val deactivatedFuncionario = service.deactivateFuncionario(id)
        return ResponseEntity.ok(deactivatedFuncionario)
    }
}


