package br.ufpr.dac.reserva_service

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
    private val DEFAULT_ROUTING_KEY = "reserva"

    @Bean
    fun novasReservas(): Queue {
        return Queue("emiratads.criareserva.reserva")
    }

    @Bean
    fun sagaCriarReserva(): DirectExchange {
        return DirectExchange("emiratads.criareserva")
    }

    @Bean
    fun reservasCQRS(): Queue {
        return Queue("emiratads.cqrs.gravacao")
    }

    @Bean
    fun reservasCQRSExchange(): DirectExchange {
        return DirectExchange("emiratads.cqrs")
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
    fun bindingCQRSReserva(
        reservasCQRSExchange: DirectExchange,
        reservasCQRS: Queue
    ): Binding {
        return BindingBuilder.bind(reservasCQRS)
            .to(reservasCQRSExchange)
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