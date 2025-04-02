package br.ufpr.dac.autenticacao_service.resource.dto

data class loginOutputDTO(
    val access_token: String,
    val token_type: String,
    val tipo: String,
    val usuario: Usuario
)