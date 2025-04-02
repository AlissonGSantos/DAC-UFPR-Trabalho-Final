package br.ufpr.dac.autenticacao_service

import br.ufpr.dac.autenticacao_service.resource.AutenticacaoListener
import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig {

    @Bean
    fun autocadastroRequests(): Queue {
        return Queue("emiratads.autocadastro.autenticacao")
    }

    @Bean
    fun sagaAutocadastro(): DirectExchange {
        return DirectExchange("emiratads.autocadastro")
    }

    @Bean
    fun sagaLogin(): DirectExchange {
        return DirectExchange("emiratads.login")
    }

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
    fun autenticacaoListener(): AutenticacaoListener {
        return AutenticacaoListener()
    }

}