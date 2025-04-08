package br.ufpr.dac.cliente_service.resource

import com.google.gson.Gson
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.ValidatorFactory
import org.postgresql.util.PSQLException
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.amqp.rabbit.listener.api.RabbitListenerErrorHandler
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import utils.dto.ClienteInputDTO
import utils.dto.ClienteOutputDTO
import utils.dto.RabbitMessageDTO
import utils.exceptions.ResourcesConflictException

@Service
class ClienteListener(private val service: ClienteService) {
    private final val gson = Gson()
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
            response = RabbitMessageDTO(false, "Cliente enviado com formato inválido: $violations", "ConstraintViolationException")
        }

        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.login.cliente"], errorHandler = "customErrorHandler")
    fun dadosLoginCliente(code: String): String {
        val idCliente = code.toLong()
        val dadosCliente = service.getClienteByID(idCliente)

        return gson.toJson(dadosCliente)
    }
}