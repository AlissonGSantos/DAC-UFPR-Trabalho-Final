package br.ufpr.dac.autenticacao_service.resource

import br.ufpr.dac.autenticacao_service.repository.IAuthRepository
import br.ufpr.dac.autenticacao_service.resource.dto.loginInputDTO
import br.ufpr.dac.autenticacao_service.resource.dto.loginOutputDTO
import br.ufpr.dac.autenticacao_service.utils.PasswordService
import br.ufpr.dac.autenticacao_service.utils.TokenJWTService
import br.ufpr.dac.autenticacao_service.utils.exception.IncorrectPasswordException
import br.ufpr.dac.autenticacao_service.utils.exception.UserNotFoundException
import org.springframework.stereotype.Service

@Service
class AuthService(private val repository: IAuthRepository,
                  private val passwordService: PasswordService,
                  private val tokenJWTService: TokenJWTService) {

    fun login(usuario: loginInputDTO): loginOutputDTO? {
        val user = repository.findItemByLogin(usuario.login)
        user?.let {
            val secrets = it.senha.split(":")
            val pass = secrets[0]
            val salt = secrets[1]

            if (passwordService.verifyPassword(usuario.senha, salt, pass)){
                return loginOutputDTO(tokenJWTService.getToken(it), "bearer", it.role.toString(), it.login)
            }

            throw IncorrectPasswordException("Senha incorreta")
        }

        throw UserNotFoundException("Usuário não encontrado")
    }
}