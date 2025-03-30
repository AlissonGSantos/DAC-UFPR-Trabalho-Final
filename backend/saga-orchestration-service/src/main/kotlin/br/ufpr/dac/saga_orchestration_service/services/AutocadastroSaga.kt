package br.ufpr.dac.saga_orchestration_service.services

import br.ufpr.dac.saga_orchestration_service.dto.ClienteCadastro
import com.google.gson.Gson
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import org.springframework.amqp.rabbit.core.RabbitTemplate

@Service
class AutocadastroSaga(private val template: RabbitTemplate, @Qualifier("sagaAutocadastro") val exchange: DirectExchange) {

    fun executeSaga(clienteCadastro: ClienteCadastro): String {
        val gson = Gson()
        val responseAuth = template.convertSendAndReceive(exchange.name, "auth", gson.toJson(clienteCadastro))
        val responseCliente = template.convertSendAndReceive(exchange.name, "cliente", gson.toJson(clienteCadastro))
        return "Autenticacao-service retornou $responseAuth e cliente-service retornou $responseCliente"
    }

}