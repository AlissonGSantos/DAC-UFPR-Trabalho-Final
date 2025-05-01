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
    private final val DEFAULT_ROUTING_KEY = "reserva"

    @Bean
    fun novasReservas(): Queue = Queue("emiratads.criareserva.reserva")

    @Bean
    fun sagaCriarReserva(): DirectExchange = DirectExchange("emiratads.criareserva")

    @Bean
    fun reservasCQRSgravacao(): Queue = Queue("emiratads.cqrs.gravacao")

    @Bean
    fun reservasCQRSedicao(): Queue = Queue("emiratads.cqrs.edicao")

    @Bean
    fun reservasCQRSExchange(): DirectExchange = DirectExchange("emiratads.cqrs")

    @Bean
    fun cancelarReserva(): Queue = Queue("emiratads.cancelareserva.reserva")

    @Bean
    fun sagaCancelarReserva(): DirectExchange = DirectExchange("emiratads.cancelareserva")

    @Bean
    fun cancelarVoo(): Queue = Queue("emiratads.cancelavoo.reserva")

    @Bean
    fun sagaCancelarVoo(): DirectExchange = DirectExchange("emiratads.cancelavoo")

    @Bean
    fun realizarVoo(): Queue = Queue("emiratads.realizavoo.reserva")

    @Bean
    fun sagaRealizarVoo(): DirectExchange = DirectExchange("emiratads.realizavoo")

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
    fun bindingCancelarReserva(
        sagaCancelarReserva: DirectExchange,
        cancelarReserva: Queue
    ): Binding {
        return BindingBuilder.bind(cancelarReserva)
            .to(sagaCancelarReserva)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun bindingCancelarVoo(
        sagaCancelarVoo: DirectExchange,
        cancelarVoo: Queue
    ): Binding {
        return BindingBuilder.bind(cancelarVoo)
            .to(sagaCancelarVoo)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun bindingRealizarVoo(
        sagaRealizarVoo: DirectExchange,
        realizarVoo: Queue
    ): Binding {
        return BindingBuilder.bind(realizarVoo)
            .to(sagaRealizarVoo)
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