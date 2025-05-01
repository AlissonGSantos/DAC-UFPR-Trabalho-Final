package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.dto.RabbitMessageDTO
import utils.dto.ReservaOutputDTO
import utils.dto.VooOutputDTO
import utils.gson.GsonProcessor
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class CancelarVooSaga(private val rabbit: RabbitUtils, @Qualifier("sagaCancelarVoo") val exchange: DirectExchange) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    suspend fun executeSaga(codigo: String): VooOutputDTO = coroutineScope {
        // Atualiza primeiro o próprio voo
        val requestVoo = async { rabbit.asyncSendAndReceive(exchange.name, "voo", codigo) }.await()
        val dadosVoo = GsonProcessor.parseJson<VooOutputDTO>(requestVoo)

        // Cancela todas as reservas desse voo
        val requestReserva = async { rabbit.asyncSendAndReceive(exchange.name, "reserva", gson.toJson(dadosVoo)) }.await()
        val listaReservas = GsonProcessor.parseJson<List<ReservaOutputDTO>>(requestReserva)

        // Reembolsa todos os clientes
        val requestCliente = async { rabbit.asyncSendAndReceive(exchange.name, "cliente", gson.toJson(listaReservas)) }.await()
        GsonProcessor.parseJson<Unit>(requestCliente)

        processResponse(dadosVoo)
    }

    private fun processResponse(dadosVoo: VooOutputDTO): VooOutputDTO = dadosVoo
}