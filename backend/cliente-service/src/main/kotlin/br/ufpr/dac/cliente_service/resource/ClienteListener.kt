package br.ufpr.dac.cliente_service.resource

import com.google.gson.Gson
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.ValidatorFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component
import utils.dto.ClienteInputDTO

@Component
class ClienteListener(private val service: ClienteService) {
    private final val gson = Gson()
    private final val factory: ValidatorFactory = Validation.buildDefaultValidatorFactory()
    private final val validator: Validator = factory.validator

    @RabbitListener(queues = ["emiratads.autocadastro.cliente"])
    fun autocadastroSaga(obj: String): String {
        val clienteInput = gson.fromJson(obj, ClienteInputDTO::class.java)

        val violations: Set<ConstraintViolation<ClienteInputDTO>> = validator.validate(clienteInput)

        if(violations.isEmpty()){
            val cliente = service.saveCliente(clienteInput)
            return gson.toJson(cliente)
        } else {
            return "Cliente enviado com formato inválido"
        }
    }

    @RabbitListener(queues = ["emiratads.login.cliente"])
    fun dadosLoginCliente(code: String): String {
        val idCliente = code.toLong()
        val dadosCliente = service.getClienteByID(idCliente)

        return gson.toJson(dadosCliente)
    }
}