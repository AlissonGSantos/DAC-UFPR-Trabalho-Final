package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.resource.mapper.VooMapper
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.RabbitMessageDTO
import utils.dto.ReservaInputDTO
import utils.dto.ReservaOutputDTO
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Service
class VooListener(private val service: VooService) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    @RabbitListener(queues = ["emiratads.criareserva.voo"], errorHandler = "customErrorHandler")
    fun verificaLotacaoVoo(payload: String): String {
        val input = gson.fromJson(payload, ReservaInputDTO::class.java)

        val dadosVoo = service.verificaEAtualizaLotacao(input.codigo_voo, input.quantidade_poltronas)

        val response = RabbitMessageDTO(true, dadosVoo)
        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.cancelareserva.voo"], errorHandler = "customErrorHandler")
    fun liberaLotacaoVoo(payload: String): String {
        val output = gson.fromJson(payload, ReservaOutputDTO::class.java)

        val dadosVoo = service.liberaLotacao(output.voo_codigo ?: "", output.poltronas_reservadas.size)

        val response = RabbitMessageDTO(true, dadosVoo)
        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.cancelavoo.voo"], errorHandler = "customErrorHandler")
    fun cancelaVoo(codigo: String): String {
        val dadosVoo = service.cancelaVoo(codigo)

        val response = RabbitMessageDTO(true, VooMapper.toDTO(dadosVoo))
        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.realizavoo.voo"], errorHandler = "customErrorHandler")
    fun realizaVoo(codigo: String): String {
        val dadosVoo = service.realizaVoo(codigo)

        val response = RabbitMessageDTO(true, VooMapper.toDTO(dadosVoo))
        return gson.toJson(response)
    }
}