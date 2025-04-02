package br.ufpr.dac.autenticacao_service.domain

enum class UserRole(val role: String) {
    CLIENTE("cliente"),
    FUNCIONARIO("funcionario");
}