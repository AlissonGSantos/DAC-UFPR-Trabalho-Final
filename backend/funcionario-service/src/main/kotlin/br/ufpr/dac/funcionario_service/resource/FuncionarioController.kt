package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.domain.Funcionario
import br.ufpr.dac.funcionario_service.service.FuncionarioService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T? = null
)

@RestController
@RequestMapping("/funcionarios")
class FuncionarioController(private val service: FuncionarioService) {

    // Endpoint GET para retornar todos os funcionários
    @GetMapping
    fun getFuncionarios(): ResponseEntity<ApiResponse<List<Funcionario>>> {
        val funcionarios = service.getAllFuncionarios()
        val response = ApiResponse(success = true, message = "Funcionários recuperados com sucesso", data = funcionarios)
        return ResponseEntity.ok(response)
    }

    // Endpoint POST para criar um novo funcionário
    @PostMapping
    fun createFuncionario(@Valid @RequestBody funcionario: Funcionario): ResponseEntity<ApiResponse<Funcionario>> {
        return try {
            val savedFuncionario = service.saveFuncionario(funcionario)
            val response = ApiResponse(success = true, message = "Funcionário criado com sucesso", data = savedFuncionario)
            ResponseEntity.status(HttpStatus.CREATED).body(response)
        } catch (e: IllegalArgumentException) {
            // Caso de erro de CPF inválido
            val response = ApiResponse(success = false, message = e.message ?: "Erro desconhecido", data = null)
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response)
        }
    }
}


