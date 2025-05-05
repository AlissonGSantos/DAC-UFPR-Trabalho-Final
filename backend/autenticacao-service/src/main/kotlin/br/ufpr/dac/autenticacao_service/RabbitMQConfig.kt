package br.ufpr.dac.autenticacao_service

import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig() {

    @Bean
    fun autocadastroRequests(): Queue = Queue("emiratads.autocadastro.autenticacao")

    @Bean
    fun sagaAutocadastro(): DirectExchange = DirectExchange("emiratads.autocadastro")

    @Bean
    fun sagaLogin(): DirectExchange = DirectExchange("emiratads.login")

    @Bean
    fun deactivateFuncionario(): Queue = Queue("emiratads.deactivate.funcionario")

    @Bean
    fun deactivateFuncionarioExchange(): DirectExchange = DirectExchange("emiratads.deactivate")

    @Bean
    fun binding(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with("auth")
    }

    @Bean
    fun bindingFuncionario(
        deactivateFuncionarioExchange: DirectExchange,
        deactivateFuncionario: Queue
    ): Binding {
        return BindingBuilder.bind(deactivateFuncionario)
            .to(deactivateFuncionarioExchange)
            .with("funcionario")
    }

}