package br.ufpr.dac.saga_orchestration_service.services

import br.ufpr.dac.saga_orchestration_service.dto.ClienteCadastro
import com.google.gson.Gson
import kotlinx.coroutines.*
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import org.springframework.amqp.rabbit.core.RabbitTemplate

@Service
class AutocadastroSaga(private val template: RabbitTemplate, @Qualifier("sagaAutocadastro") val exchange: DirectExchange) {

    suspend fun executeSaga(clienteCadastro: ClienteCadastro): String = coroutineScope {
        val gson = Gson()
        val requestAuth = async { asyncSendAndReceive(exchange.name, "auth", gson.toJson(clienteCadastro)) }
        val requestCliente = async { asyncSendAndReceive(exchange.name, "cliente", gson.toJson(clienteCadastro)) }

        val responseAuth = requestAuth.await()
        val responseCliente = requestCliente.await()

        processResponses(responseCliente, responseAuth)
    }

    private suspend fun asyncSendAndReceive(exchange: String, routingKey: String, message: String): String {
        return withContext(Dispatchers.IO) {
            template.convertSendAndReceive(exchange, routingKey, message) as String
        }
    }

    private fun processResponses(vararg response: String): String{
        return "Processei ${response.asList()}"
    }

}