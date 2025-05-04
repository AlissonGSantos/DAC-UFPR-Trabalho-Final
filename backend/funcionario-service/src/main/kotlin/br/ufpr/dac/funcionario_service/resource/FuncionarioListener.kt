package br.ufpr.dac.funcionario_service.resource

import com.google.gson.Gson
import jakarta.validation.ConstraintViolation
import jakarta.validation.Validation
import jakarta.validation.Validator
import jakarta.validation.ValidatorFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service
import utils.dto.FuncionarioInputDTO
import utils.dto.FuncionarioOutputDTO
import utils.dto.RabbitMessageDTO

@Service
class FuncionarioListener(private val service: FuncionarioService) {
    private val gson = Gson()
    private val factory: ValidatorFactory = Validation.buildDefaultValidatorFactory()
    private val validator: Validator = factory.validator

    @RabbitListener(queues = ["emiratads.autocadastro.funcionario"], errorHandler = "customErrorHandler")
    fun cadastrarFuncionarioSaga(obj: String): String {
        val response: RabbitMessageDTO<FuncionarioOutputDTO>
        val funcionarioInput = gson.fromJson(obj, FuncionarioInputDTO::class.java)
        val violations: Set<ConstraintViolation<FuncionarioInputDTO>> = validator.validate(funcionarioInput)

        if(violations.isEmpty()) {
            val funcionario = service.saveFuncionario(funcionarioInput)
            response = RabbitMessageDTO(true, funcionario)
        } else {
            response = RabbitMessageDTO(false, "Funcionário informado com formato inválido: ${violations}")
        }

        return gson.toJson(response)
    }

    @RabbitListener(queues = ["emiratads.login.funcionario"], errorHandler = "customErrorHandler")
    fun dadosLoginFuncionario(code: String): String {
        val codigo = code.toLong()
        val dadosFuncionario = service.getFuncionarioById(codigo)
        val gson = Gson()

        return gson.toJson(dadosFuncionario)
    }

}
