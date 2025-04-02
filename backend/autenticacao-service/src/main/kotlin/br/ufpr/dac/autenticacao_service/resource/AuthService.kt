package br.ufpr.dac.autenticacao_service.resource

import br.ufpr.dac.autenticacao_service.repository.IAuthRepository
import br.ufpr.dac.autenticacao_service.resource.dto.loginInputDTO
import br.ufpr.dac.autenticacao_service.resource.dto.loginOutputDTO
import org.springframework.stereotype.Service

@Service
class AuthService(private val repository: IAuthRepository) {

    fun login(usuario: loginInputDTO): loginOutputDTO? {
        val user = repository.findItemByLogin(usuario.login)
        return user?.let { loginOutputDTO(it) }
    }
}