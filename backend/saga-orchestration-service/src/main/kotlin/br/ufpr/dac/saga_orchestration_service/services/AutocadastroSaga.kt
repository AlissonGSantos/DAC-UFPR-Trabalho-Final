package br.ufpr.dac.saga_orchestration_service.services

import com.google.gson.Gson
import kotlinx.coroutines.*
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import org.springframework.amqp.rabbit.core.RabbitTemplate
import utils.GsonProcessor
import utils.dto.*

@Service
class AutocadastroSaga(private val template: RabbitTemplate, @Qualifier("sagaAutocadastro") val exchange: DirectExchange) {
    private val gson = Gson()

    suspend fun executeSaga(clienteCadastro: ClienteInputDTO): ClienteOutputDTO = coroutineScope {
        val requestCliente = async { asyncSendAndReceive(exchange.name, "cliente", gson.toJson(clienteCadastro)) }
        val responseCliente = requestCliente.await()

        val cliente = GsonProcessor.parseJson<ClienteOutputDTO>(responseCliente)
        val inputCadastro = UsuarioInputDTO( cliente.codigo, cliente.email, null, UsuarioRole.CLIENTE)

        val requestAuth = async { asyncSendAndReceive(exchange.name, "auth", gson.toJson(inputCadastro)) }
        val responseAuth = requestAuth.await()

        processResponses(cliente, responseAuth)
    }

    private suspend fun asyncSendAndReceive(exchange: String, routingKey: String, message: String): String {
        return withContext(Dispatchers.IO) {
            template.convertSendAndReceive(exchange, routingKey, message) as String
        }
    }

    private fun processResponses(responseCliente: ClienteOutputDTO, responseAuth: String): ClienteOutputDTO {
        if (responseAuth == "Sucesso"){
            return responseCliente
        } else {
            throw RuntimeException()
        }
    }

}