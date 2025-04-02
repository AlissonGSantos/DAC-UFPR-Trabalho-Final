package br.ufpr.dac.autenticacao_service.resource.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class loginInputDTO(
    @NotBlank
    @Email
    val login: String,
    @NotBlank
    val senha: String
)
