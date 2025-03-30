package br.ufpr.dac.cliente_service.resource

import org.springframework.amqp.rabbit.annotation.RabbitListener

class ClienteListener {

    @RabbitListener(queues = ["emiratads.autocadastro.requests"])
    fun autocadastroSaga(obj: String): String {
        return "[CLIENTE] Recebido $obj"
    }
}
