package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.coroutineScope
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class CancelarVooSaga(private val rabbit: RabbitUtils, @Qualifier("sagaCancelarVoo") val exchange: DirectExchange) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    suspend fun executeSaga(codigo: String): Unit = coroutineScope {
        // Atualiza primeiro o próprio voo

        // Cancela todas as reservas desse voo

        // Reembolsa todos os clientes
    }

    private fun processResponse(){}
}