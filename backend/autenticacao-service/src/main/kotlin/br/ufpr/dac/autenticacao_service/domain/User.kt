package br.ufpr.dac.autenticacao_service.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "users")
data class User(
    @Id
    val login: String,
    val code: Long,
    val senha: String,
    val role: UserRole
)