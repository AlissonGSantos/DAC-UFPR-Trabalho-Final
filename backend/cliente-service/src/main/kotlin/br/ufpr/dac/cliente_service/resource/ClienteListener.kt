package br.ufpr.dac.cliente_service.resource

import com.google.gson.Gson
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
class ClienteListener(private val service: ClienteService) {

    @RabbitListener(queues = ["emiratads.autocadastro.cliente"])
    fun autocadastroSaga(obj: String): String {
        return "[CLIENTE] Recebido $obj"
    }

    @RabbitListener(queues = ["emiratads.login.cliente"])
    fun dadosLoginCliente(code: String): String {
        val idCliente = code.toLong()
        val dadosCliente = service.getClienteByID(idCliente)
        val gson = Gson()

        return gson.toJson(dadosCliente)
    }
}