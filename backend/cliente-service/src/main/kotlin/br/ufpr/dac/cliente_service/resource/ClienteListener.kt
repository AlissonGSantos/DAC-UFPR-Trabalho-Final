package br.ufpr.dac.cliente_service.resource

import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
class ClienteListener {

    @RabbitListener(queues = ["emiratads.autocadastro.cliente"])
    fun autocadastroSaga(obj: String): String {
        return "[CLIENTE] Recebido $obj"
    }
}
