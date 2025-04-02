package br.ufpr.dac.autenticacao_service.resource

import br.ufpr.dac.autenticacao_service.resource.dto.loginInputDTO
import br.ufpr.dac.autenticacao_service.resource.dto.loginOutputDTO
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class AuthService : UserDetailsService {
    fun login(usuario: loginInputDTO): loginOutputDTO {

    }

    override fun loadUserByUsername(username: String?): UserDetails {
        TODO("Not yet implemented")
    }
}