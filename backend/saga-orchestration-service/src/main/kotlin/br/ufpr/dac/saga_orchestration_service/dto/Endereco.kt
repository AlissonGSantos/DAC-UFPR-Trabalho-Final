package br.ufpr.dac.saga_orchestration_service.dto

data class Endereco(
    val codigo: Long,
    var cep: String,
    var uf: String,
    var cidade: String,
    var bairro: String,
    var rua: String,
    var numero: String,
    var complemento: String
)