package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.dto.*
import utils.gson.GsonProcessor
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class CancelarReservaSaga(private val rabbit: RabbitUtils, @Qualifier("sagaCancelarReserva") val exchange: DirectExchange) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    suspend fun executeSaga(codigo: String): ReservaOutputDTO = coroutineScope {
        // Atualiza primeiro a própria reserva
        val reservaRequest = async { rabbit.asyncSendAndReceive(exchange.name, "reserva", codigo) }.await()
        val dadosReserva = GsonProcessor.parseJson<ReservaOutputDTO>(reservaRequest)

        // Reembolsa o cliente
        val clienteRequest = async { rabbit.asyncSendAndReceive(exchange.name, "cliente", gson.toJson(dadosReserva)) }.await()
        val dadosCliente = GsonProcessor.parseJson<ClienteOutputDTO>(clienteRequest)

        // Libera os assentos do voo
        val vooRequest = async { rabbit.asyncSendAndReceive(exchange.name, "voo", gson.toJson(dadosReserva)) }.await()
        val dadosVoo = GsonProcessor.parseJson<VooOutputDTO>(vooRequest)

        processResponse(dadosReserva, dadosVoo, dadosCliente)
    }

    private fun processResponse(dadosReserva: ReservaOutputDTO, dadosVoo: VooOutputDTO, dadosCliente: ClienteOutputDTO): ReservaOutputDTO{
        return ReservaOutputDTO(
            dadosReserva.codigo,
            dadosReserva.data,
            dadosReserva.estado,
            dadosReserva.quantidade_milhas,
            dadosCliente.codigo,
            dadosCliente.saldo_milhas,
            dadosReserva.poltronas_reservadas,
            dadosVoo
        )
    }
}