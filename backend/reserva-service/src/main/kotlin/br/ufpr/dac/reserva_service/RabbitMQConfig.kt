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
    fun reservasCQRSgravacao(): Queue {
        return Queue("emiratads.cqrs.gravacao")
    }

    @Bean
    fun reservasCQRSedicao(): Queue {
        return Queue("emiratads.cqrs.edicao")
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
    fun bindingCQRSReservaGravacao(
        reservasCQRSExchange: DirectExchange,
        reservasCQRSgravacao: Queue
    ): Binding {
        return BindingBuilder.bind(reservasCQRSgravacao)
            .to(reservasCQRSExchange)
            .with("gravacao")
    }

    @Bean
    fun bindingCQRSReservaEdicao(
        reservasCQRSExchange: DirectExchange,
        reservasCQRSedicao: Queue
    ): Binding {
        return BindingBuilder.bind(reservasCQRSedicao)
            .to(reservasCQRSExchange)
            .with("edicao")
    }

    @Bean
    fun rabbitListenerContainerFactory(connectionFactory: ConnectionFactory): SimpleRabbitListenerContainerFactory {
        val factory = SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory)
        factory.setDefaultRequeueRejected(false)
        return factory
    }
}