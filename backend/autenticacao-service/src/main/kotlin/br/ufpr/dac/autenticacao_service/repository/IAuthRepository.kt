package br.ufpr.dac.autenticacao_service.repository

import br.ufpr.dac.autenticacao_service.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.security.core.userdetails.UserDetails

interface IAuthRepository : JpaRepository<User, String> {
    fun findByLogin(login: String): UserDetails
}