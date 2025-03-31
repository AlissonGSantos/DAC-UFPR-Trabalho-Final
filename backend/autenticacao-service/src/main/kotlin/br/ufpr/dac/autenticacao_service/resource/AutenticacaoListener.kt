package br.ufpr.dac.autenticacao_service.resource

import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
class AutenticacaoListener {

    @RabbitListener(queues = ["emiratads.autocadastro.autenticacao"])
    fun autocadastroSaga(obj: String): String {
        return "[AUTH] Recebido $obj"
    }

}