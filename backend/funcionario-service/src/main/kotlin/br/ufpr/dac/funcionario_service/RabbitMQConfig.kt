package br.ufpr.dac.funcionario_service

import br.ufpr.dac.funcionario_service.resource.FuncionarioListener
import br.ufpr.dac.funcionario_service.resource.FuncionarioService
import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig(private val funcionarioService: FuncionarioService) {

    @Bean
    fun autocadastroRequests(): Queue {
        return Queue("emiratads.autocadastro.funcionario")
    }

    @Bean
    fun sagaAutocadastro(): DirectExchange {
        return DirectExchange("emiratads.autocadastro")
    }

    @Bean
    fun loginFuncionarios(): Queue {
        return Queue("emiratads.login.funcionario")
    }

    @Bean
    fun sagaLogin(): DirectExchange {
        return DirectExchange("emiratads.login")
    }

    @Bean
    fun bindingAutocadastro(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with("funcionario")
    }

    @Bean
    fun bindingLogin(
        sagaLogin: DirectExchange,
        loginFuncionarios: Queue
    ): Binding {
        return BindingBuilder.bind(loginFuncionarios)
            .to(sagaLogin)
            .with("funcionario")
    }

    @Bean
    fun funcionarioListener(): FuncionarioListener {
        return FuncionarioListener(funcionarioService)
    }


}