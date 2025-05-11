package br.ufpr.dac.cliente_service.resource

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.ValidatorFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.*
import utils.gson.ZonedDateTimeAdapter
import java.lang.IllegalArgumentException
import java.time.ZonedDateTime

@Service
class ClienteListener(private val service: ClienteService, private val milhasService: MilhasService) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()
    private final val factory: ValidatorFactory = Validation.buildDefaultValidatorFactory()
    private final val validator: Validator = factory.validator

    @RabbitListener(queues = ["emiratads.autocadastro.cliente"], errorHandler = "customErrorHandler")
    fun autocadastroSaga(obj: String): String {
        val response: RabbitMessageDTO<ClienteOutputDTO>
        val clienteInput = gson.fromJson(obj, ClienteInputDTO::class.java)
        val violations: Set<ConstraintViolation<ClienteInputDTO>> = validator.validate(clienteInput)

        if (violations.isEmpty()) {
            val cliente = service.saveCliente(clienteInput)
            response = RabbitMessageDTO(true, cliente)
        } else {
            response = RabbitMessageDTO(
                false,
                "Cliente enviado com formato inválido: $violations",
                "ConstraintViolationException"
            )
        }

        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.login.cliente"], errorHandler = "customErrorHandler")
    fun dadosLoginCliente(code: String): String {
        val idCliente = code.toLong()
        val dadosCliente = service.getClienteByID(idCliente)

        return gson.toJson(dadosCliente)
    }

    @RabbitListener(queues = ["emiratads.criareserva.saldo"], errorHandler = "customErrorHandler")
    fun consultaSaldo(payload: String): String {
        val dadosReserva = gson.fromJson(payload, ReservaInputDTO::class.java)
        val dadosCliente = service.getClienteByID(dadosReserva.codigo_cliente)

        if (dadosReserva.milhas_utilizadas > dadosCliente.saldo_milhas){
            throw IllegalArgumentException("Saldo de milhas insuficiente")
        }

        return gson.toJson(RabbitMessageDTO(true, dadosCliente))
    }

    @RabbitListener(queues = ["emiratads.criareserva.cliente"], errorHandler = "customErrorHandler")
    fun efetuarReserva(payload: String): String {
        val transaction = gson.fromJson(payload, ReservaCreationResponseDTO::class.java)
        val result = milhasService.registrarReserva(transaction)

        return gson.toJson(RabbitMessageDTO(true, result))
    }

    @RabbitListener(queues = ["emiratads.cancelareserva.cliente"], errorHandler = "customErrorHandler")
    fun cancelarReserva(payload: String): String {
        val reserva = gson.fromJson(payload, ReservaOutputDTO::class.java)
        val result = milhasService.reembolsarReserva(reserva)

        return gson.toJson(RabbitMessageDTO(true, result))
    }

    @RabbitListener(queues = ["emiratads.cancelavoo.cliente"], errorHandler = "customErrorHandler")
    fun canceladoVoo(payload: String): String {
        val reservas: List<ReservaOutputDTO> = gson.fromJson(
            payload,
            object : TypeToken<List<ReservaOutputDTO>>() {}.type
        )
        val result = milhasService.reembolsarVoo(reservas)
        return gson.toJson(RabbitMessageDTO(true, result))
    }
}