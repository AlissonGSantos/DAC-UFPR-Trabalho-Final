package br.ufpr.dac.autenticacao_service.resource

import com.google.gson.Gson
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import utils.dto.UsuarioInputDTO

@Service
class AutenticacaoListener(private val authService: AuthService) {
    val gson = Gson()

    @RabbitListener(queues = ["emiratads.autocadastro.autenticacao"])
    fun autocadastroSaga(obj: String): String {
        val cadastro = gson.fromJson(obj, UsuarioInputDTO::class.java)
        authService.cadastro(cadastro)

        return "Sucesso"
    }

    @RabbitListener(queues = ["emiratads.deactivate.funcionario"])
    fun deactivateFuncionario(codigo: String) {
        authService.desativarFuncionario(codigo.toLong())
    }
}