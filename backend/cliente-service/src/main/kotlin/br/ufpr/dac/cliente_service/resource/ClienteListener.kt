package br.ufpr.dac.cliente_service.resource

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.ValidatorFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.*
import utils.gson.ZonedDateTimeAdapter
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

    @RabbitListener(queues = ["emiratads.criareserva.cliente"], errorHandler = "customErrorHandler")
    fun efetuarReserva(payload: String): String {
        val transaction = gson.fromJson(payload, ReservaCreationResponseDTO::class.java)
        val result = milhasService.registrarReserva(transaction)

        return gson.toJson(RabbitMessageDTO(true, result))
    }
}