package br.ufpr.dac.reserva_service.resource

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.RabbitMessageDTO
import utils.dto.ReservaTransactionDTO
import utils.dto.VooOutputDTO
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class TransactionListener(private val service: ReservaService) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    @RabbitListener(queues = ["emiratads.criareserva.reserva"], errorHandler = "customErrorHandler")
    fun efetuarReserva(payload: String): String {
        val reservaTransaction = gson.fromJson(payload, ReservaTransactionDTO::class.java)

        val milhasTransaction = service.efetuarReserva(reservaTransaction)
        val response = RabbitMessageDTO(true, milhasTransaction)
        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.cancelareserva.reserva"], errorHandler = "customErrorHandler")
    fun cancelarReserva(codigo: String): String {
        val reserva = service.cancelarReserva(codigo)
        val response = RabbitMessageDTO(true, reserva)

        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.cancelavoo.reserva"], errorHandler = "customErrorHandler")
    fun canceladoVoo(payload: String): String {
        val voo = gson.fromJson(payload, VooOutputDTO::class.java)
        val reserva = service.canceladoVoo(voo)
        val response = RabbitMessageDTO(true, reserva)

        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.realizavoo.reserva"], errorHandler = "customErrorHandler")
    fun realizaVoo(payload: String): String {
        val voo = gson.fromJson(payload, VooOutputDTO::class.java)
        val reserva = service.realizaVoo(voo)
        val response = RabbitMessageDTO(true, reserva)

        return gson.toJson(response)
    }
}