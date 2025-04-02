package br.ufpr.dac.autenticacao_service.resource.dto

import br.ufpr.dac.autenticacao_service.domain.User

data class loginOutputDTO(
    val access_token: String,
    val token_type: String,
    val tipo: String,
    val nome: String
    /*val usuario: Usuario*/
)