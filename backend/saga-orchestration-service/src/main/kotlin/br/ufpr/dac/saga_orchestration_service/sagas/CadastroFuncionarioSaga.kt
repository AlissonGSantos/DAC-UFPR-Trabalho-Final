package br.ufpr.dac.saga_orchestration_service.sagas

import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.gson.GsonProcessor
import utils.dto.FuncionarioInputDTO
import utils.dto.FuncionarioOutputDTO
import utils.dto.UsuarioInputDTO
import utils.dto.UsuarioRole

@Service
class CadastroFuncionarioSaga (private val template: RabbitTemplate, @Qualifier("sagaAutocadastro") val exchange: DirectExchange) {
     private val gson = Gson()

    suspend fun executeSaga(funcionarioCadastro: FuncionarioInputDTO): FuncionarioOutputDTO = coroutineScope {
        val requestFuncionario = async { asyncSendAndReceive(exchange.name, "funcionario", gson.toJson(funcionarioCadastro)) }
        val responseFuncionario = requestFuncionario.await()

        val funcionario = GsonProcessor.parseJson<FuncionarioOutputDTO>(responseFuncionario)
        val inputFuncionario = UsuarioInputDTO(funcionario.codigo, funcionario.email, funcionarioCadastro.senha, UsuarioRole.FUNCIONARIO)

        val requestAuth = async { asyncSendAndReceive(exchange.name, "auth", gson.toJson(inputFuncionario)) }
        val responseAuth = requestAuth.await()

        processResponses(funcionario, responseAuth)
    }

    private suspend fun asyncSendAndReceive(exchange: String, routingKey: String, message: String): String {
        return withContext(Dispatchers.IO) {
            template.convertSendAndReceive(exchange, routingKey, message) as String
        }
    }

    private suspend fun processResponses(responseFuncionario: FuncionarioOutputDTO, responseAuth: String): FuncionarioOutputDTO {
        if (responseAuth == "Sucesso") {
            return responseFuncionario
        } else {
            throw RuntimeException()
        }
    }
}