package br.ufpr.dac.funcionario_service.resource.dto

import jakarta.validation.constraints.*

data class FuncionarioInputDTO(
    @NotBlank val codigo: Long,
    @NotBlank val nome: String,
    val cpf: String,
    @NotBlank @Email val email: String,
    val telefone: String
)
