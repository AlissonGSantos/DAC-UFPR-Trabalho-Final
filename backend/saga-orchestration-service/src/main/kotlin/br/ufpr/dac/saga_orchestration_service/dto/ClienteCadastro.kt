package br.ufpr.dac.saga_orchestration_service.dto

data class ClienteCadastro(
    val cpf: String,
    var email: String,
    var nome: String,
    var endereco: Endereco
)