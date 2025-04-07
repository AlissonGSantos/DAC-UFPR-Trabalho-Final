package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioDTO
import br.ufpr.dac.funcionario_service.service.FuncionarioService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.DeleteMapping

@RestController
@RequestMapping("/funcionarios")
class FuncionarioController(private val service: FuncionarioService) {

    @GetMapping
    fun getFuncionarios(): ResponseEntity<List<FuncionarioDTO>> {
        val funcionarios = service.getAllFuncionarios()
        return ResponseEntity.ok().body(funcionarios)
    }

    @GetMapping("/{id}")
    fun getFuncionarioById(@PathVariable id: Long): ResponseEntity<FuncionarioDTO> {
        val funcionario = service.getFuncionarioById(id)
        return ResponseEntity.ok().body(funcionario)
    }

    @PutMapping("/{id}")
    fun updateFuncionario(
        @Valid @RequestBody funcionario: FuncionarioDTO, @PathVariable id: Long
    ): ResponseEntity<FuncionarioDTO> {
        val updatedFuncionario = service.updateFuncionario(id, funcionario)
        return ResponseEntity.ok().body(updatedFuncionario)
    }

    @PostMapping
    fun createFuncionario(@Valid @RequestBody funcionario: FuncionarioDTO): ResponseEntity<FuncionarioDTO> {
        return try {
            val savedFuncionario = service.saveFuncionario(funcionario)
            ResponseEntity.status(HttpStatus.CREATED).body(savedFuncionario)
        } catch (e: IllegalArgumentException) {
            // Caso de erro de CPF inválido
            throw IllegalArgumentException(e.message)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteFuncionario(@PathVariable id: Long): ResponseEntity<FuncionarioDTO> {
        val deactivatedFuncionario = service.deactivateFuncionario(id)
        return ResponseEntity.ok(deactivatedFuncionario)
    }
}


