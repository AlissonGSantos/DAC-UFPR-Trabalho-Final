package br.ufpr.dac.funcionario_service.resource

import com.google.gson.Gson
import org.springframework.amqp.rabbit.annotation.RabbitListener

class FuncionarioListener(private val service: FuncionarioService) {

    @RabbitListener(queues = ["emiratads.login.funcionario"])
    fun dadosLoginFuncionario(code: String): String {
        val codigo = code.toLong()
        val dadosFuncionario = service.getFuncionarioByID(codigo)
        val gson = Gson()

        return gson.toJson(dadosFuncionario)
    }

}
