package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.dto.AlternaEstadoDTO
import utils.dto.VooOutputDTO
import utils.gson.GsonProcessor
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class RealizarVooSaga(private val rabbit: RabbitUtils, @Qualifier("sagaRealizarVoo") val exchange: DirectExchange) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    suspend fun executeSaga(codigo: String, estado: AlternaEstadoDTO): VooOutputDTO = coroutineScope {
        // Atualiza primeiro o próprio voo
        val requestVoo = async { rabbit.asyncSendAndReceive(exchange.name, "voo", codigo) }.await()
        val dadosVoo = GsonProcessor.parseJson<VooOutputDTO>(requestVoo)

        // Atualiza todas as reservas desse voo
        val requestReserva = async { rabbit.asyncSendAndReceive(exchange.name, "reserva", gson.toJson(dadosVoo)) }.await()
        GsonProcessor.parseJson<Unit>(requestReserva)

        processResponse(dadosVoo)
    }

    private fun processResponse(dadosVoo: VooOutputDTO): VooOutputDTO = dadosVoo
}