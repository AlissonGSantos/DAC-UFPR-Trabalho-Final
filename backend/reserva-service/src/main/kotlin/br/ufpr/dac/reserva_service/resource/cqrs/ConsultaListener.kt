package br.ufpr.dac.reserva_service.resource.cqrs

import br.ufpr.dac.reserva_service.resource.dto.ReservaConsultaInputDTO
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.ReservaUpdateEstadoDTO
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class ConsultaListener(private val service: AsyncReservaService) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    @RabbitListener(queues = ["emiratads.cqrs.gravacao"])
    fun gravarReserva(payload: String) {
        val reservas: List<ReservaConsultaInputDTO> = gson.fromJson(
            payload,
            object : TypeToken<List<ReservaConsultaInputDTO>>() {}.type
        )
        service.gravarReserva(reservas)
    }

    @RabbitListener(queues = ["emiratads.cqrs.edicao"])
    fun editaReserva(payload: String) {
        val reservas = gson.fromJson(payload, ReservaUpdateEstadoDTO::class.java)
        service.editarReserva(reservas)
    }
}