package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import kotlinx.coroutines.*
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.gson.GsonProcessor
import utils.dto.*

@Service
class AutocadastroSaga(private val rabbit: RabbitUtils, @Qualifier("sagaAutocadastro") val exchange: DirectExchange) {
    private val gson = Gson()

    suspend fun executeSaga(clienteCadastro: ClienteInputDTO): ClienteOutputDTO = coroutineScope {
        val requestCliente = async { rabbit.asyncSendAndReceive(exchange.name, "cliente", gson.toJson(clienteCadastro)) }
        val responseCliente = requestCliente.await()

        val cliente = GsonProcessor.parseJson<ClienteOutputDTO>(responseCliente)
        val inputCadastro = UsuarioInputDTO( cliente.codigo, cliente.email, null, UsuarioRole.CLIENTE)

        val requestAuth = async { rabbit.asyncSendAndReceive(exchange.name, "auth", gson.toJson(inputCadastro)) }
        val responseAuth = requestAuth.await()

        processResponses(cliente, responseAuth)
    }

    private fun processResponses(responseCliente: ClienteOutputDTO, responseAuth: String): ClienteOutputDTO {
        if (responseAuth == "Sucesso"){
            return responseCliente
        } else {
            throw RuntimeException()
        }
    }

}