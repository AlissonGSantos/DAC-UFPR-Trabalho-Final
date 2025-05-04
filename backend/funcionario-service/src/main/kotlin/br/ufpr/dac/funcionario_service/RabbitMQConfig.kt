package br.ufpr.dac.funcionario_service

import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig {

    @Bean
    fun autocadastroRequests(): Queue = Queue("emiratads.autocadastro.funcionario")

    @Bean
    fun sagaAutocadastro(): DirectExchange = DirectExchange("emiratads.autocadastro")

    @Bean
    fun loginFuncionarios(): Queue = Queue("emiratads.login.funcionario")

    @Bean
    fun sagaLogin(): DirectExchange = DirectExchange("emiratads.login")

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
}