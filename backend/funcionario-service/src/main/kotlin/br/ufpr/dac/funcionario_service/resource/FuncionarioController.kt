package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioInputDTO
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioOutputDTO
import br.ufpr.dac.funcionario_service.service.FuncionarioService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.DeleteMapping

@RestController
@RequestMapping("/funcionarios")
class FuncionarioController(private val service: FuncionarioService) {

    // Endpoint GET para retornar todos os funcionários
    @GetMapping
    fun getFuncionarios(): ResponseEntity<List<FuncionarioOutputDTO>> {
        val funcionarios = service.getAllFuncionarios()
        return ResponseEntity.ok().body(funcionarios)
    }

    @PutMapping("/{id}")
    fun updateFuncionario(
        @Valid @RequestBody funcionario: FuncionarioInputDTO, @PathVariable id: Long
    ): ResponseEntity<FuncionarioOutputDTO> {
        val updatedFuncionario = service.updateFuncionario(id, funcionario)
        return ResponseEntity.ok().body(FuncionarioOutputDTO(updatedFuncionario))
    }

    // Endpoint POST para criar um novo funcionário
    @PostMapping
    fun createFuncionario(@Valid @RequestBody funcionario: FuncionarioInputDTO): ResponseEntity<FuncionarioOutputDTO> {
        return try {
            val savedFuncionario = service.saveFuncionario(funcionario)
            ResponseEntity.status(HttpStatus.CREATED).body(FuncionarioOutputDTO(savedFuncionario))
        } catch (e: IllegalArgumentException) {
            // Caso de erro de CPF inválido
            throw IllegalArgumentException(e.message)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteFuncionario(@PathVariable id: Long): ResponseEntity<FuncionarioOutputDTO> {
        val deactivatedFuncionario = service.deactivateFuncionario(id)
        return ResponseEntity.ok(FuncionarioOutputDTO(deactivatedFuncionario))
    }
}


