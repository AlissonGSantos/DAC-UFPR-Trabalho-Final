package br.ufpr.dac.autenticacao_service.resource

import utils.dto.UsuarioRole
import br.ufpr.dac.autenticacao_service.repository.IAuthRepository
import br.ufpr.dac.autenticacao_service.resource.dto.UsuarioMapper
import br.ufpr.dac.autenticacao_service.resource.dto.loginInputDTO
import br.ufpr.dac.autenticacao_service.resource.dto.loginOutputDTO
import br.ufpr.dac.autenticacao_service.utils.EmailService
import br.ufpr.dac.autenticacao_service.utils.PasswordService
import br.ufpr.dac.autenticacao_service.utils.TokenJWTService
import br.ufpr.dac.autenticacao_service.utils.exception.IncorrectPasswordException
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.dto.ClienteOutputDTO
import utils.dto.FuncionarioOutputDTO
import utils.dto.UsuarioInputDTO
import utils.dto.UsuarioOutputDTO
import utils.exceptions.ResourceNotFoundException

@Service
class AuthService(
    private val repository: IAuthRepository,
    private val template: RabbitTemplate,
    private val passwordService: PasswordService,
    private val emailService: EmailService,
    @Qualifier("sagaLogin") val exchange: DirectExchange,
    private val tokenJWTService: TokenJWTService
) {

    fun login(usuario: loginInputDTO): loginOutputDTO? {
        val user = repository.findItemByLogin(usuario.login)
        user?.let {
            val secrets = it.senha.split(":")
            val pass = secrets[0]
            val salt = secrets[1]

            if (passwordService.verifyPassword(usuario.senha, salt, pass)) {

                val routingKey = if (it.role == UsuarioRole.CLIENTE) {
                    "cliente"
                } else {
                    "funcionario"
                }

                val userData: UsuarioOutputDTO = runBlocking {
                    val request = async { asyncSendAndReceive(exchange.name, routingKey, it.code.toString()) }
                    val response = request.await()

                    processDadosUsuario(response, it.role)
                }

                return loginOutputDTO(tokenJWTService.getToken(it), "bearer", it.role.toString(), userData)
            }

            throw IncorrectPasswordException("Senha incorreta")
        }

        throw ResourceNotFoundException("Usuário não encontrado")
    }

    fun cadastro(cadastro : UsuarioInputDTO) {
        if (cadastro.senha == null){
            val novaSenha = passwordService.generateRandomPassword()
            emailService.sendEmail(cadastro.email, novaSenha)

            val salt = passwordService.generateSalt()
            cadastro.senha = "${passwordService.hashPassword(novaSenha, salt)}:$salt"
        }

        val user = UsuarioMapper.toDomain(cadastro)
        repository.save(user)
    }

    private suspend fun asyncSendAndReceive(exchange: String, routingKey: String, message: String): String {
        return withContext(Dispatchers.IO) {
            template.convertSendAndReceive(exchange, routingKey, message) as String
        }
    }

    private fun processDadosUsuario(data: String, role: UsuarioRole): UsuarioOutputDTO {
        val gson = Gson()
        val classe = if (role == UsuarioRole.CLIENTE) {
            ClienteOutputDTO::class.java
        } else {
            FuncionarioOutputDTO::class.java
        }

        return gson.fromJson(data, classe)
    }
}