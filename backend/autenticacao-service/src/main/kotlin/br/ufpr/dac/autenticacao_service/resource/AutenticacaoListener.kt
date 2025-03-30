package br.ufpr.dac.autenticacao_service.resource

import org.springframework.amqp.rabbit.annotation.RabbitListener

class AutenticacaoListener {

    @RabbitListener(queues = ["emiratads.autocadastro.requests"])
    fun autocadastroSaga(obj: String): String {
        return "[AUTH] Recebido $obj"
    }

}