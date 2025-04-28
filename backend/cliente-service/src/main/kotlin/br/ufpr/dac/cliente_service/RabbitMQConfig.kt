package br.ufpr.dac.cliente_service

import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig {
    private val DEFAULT_ROUTING_KEY = "cliente"

    @Bean
    fun autocadastroRequests(): Queue {
        return Queue("emiratads.autocadastro.cliente")
    }

    @Bean
    fun sagaAutocadastro(): DirectExchange {
        return DirectExchange("emiratads.autocadastro")
    }

    @Bean
    fun loginClientes(): Queue {
        return Queue("emiratads.login.cliente")
    }

    @Bean
    fun sagaLogin(): DirectExchange {
        return DirectExchange("emiratads.login")
    }

    @Bean
    fun novasReservas(): Queue {
        return Queue("emiratads.criareserva.cliente")
    }

    @Bean
    fun sagaCriarReserva(): DirectExchange {
        return DirectExchange("emiratads.criareserva")
    }

    @Bean
    fun bindingAutocadastro(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun bindingLogin(
        sagaLogin: DirectExchange,
        loginClientes: Queue
    ): Binding {
        return BindingBuilder.bind(loginClientes)
            .to(sagaLogin)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun bindingCriarReserva(
        sagaCriarReserva: DirectExchange,
        novasReservas: Queue
    ): Binding {
        return BindingBuilder.bind(novasReservas)
            .to(sagaCriarReserva)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun rabbitListenerContainerFactory(connectionFactory: ConnectionFactory): SimpleRabbitListenerContainerFactory {
        val factory = SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory)
        factory.setDefaultRequeueRejected(false)
        return factory
    }

}