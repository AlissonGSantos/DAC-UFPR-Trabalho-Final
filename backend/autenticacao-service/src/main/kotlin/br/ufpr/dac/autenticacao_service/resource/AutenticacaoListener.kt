package br.ufpr.dac.autenticacao_service.resource

import com.google.gson.Gson
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import utils.dto.UsuarioInputDTO

@Service
class AutenticacaoListener(private val authService: AuthService) {

    @RabbitListener(queues = ["emiratads.autocadastro.autenticacao", "emiratads.cadastroFuncionario.auth"])
    fun autocadastroSaga(obj: String): String {
        val gson = Gson()

        val cadastro = gson.fromJson(obj, UsuarioInputDTO::class.java)
        authService.cadastro(cadastro)

        return "Sucesso"
    }

}