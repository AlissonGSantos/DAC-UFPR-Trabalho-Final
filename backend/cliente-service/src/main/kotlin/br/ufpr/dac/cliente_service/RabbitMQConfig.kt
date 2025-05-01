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
    private final val DEFAULT_ROUTING_KEY = "cliente"

    @Bean
    fun autocadastroRequests(): Queue = Queue("emiratads.autocadastro.cliente")

    @Bean
    fun sagaAutocadastro(): DirectExchange = DirectExchange("emiratads.autocadastro")

    @Bean
    fun loginClientes(): Queue = Queue("emiratads.login.cliente")

    @Bean
    fun sagaLogin(): DirectExchange = DirectExchange("emiratads.login")

    @Bean
    fun novasReservas(): Queue = Queue("emiratads.criareserva.cliente")

    @Bean
    fun consultaSaldo(): Queue = Queue("emiratads.criareserva.saldo")

    @Bean
    fun sagaCriarReserva(): DirectExchange = DirectExchange("emiratads.criareserva")

    @Bean
    fun cancelarReserva(): Queue = Queue("emiratads.cancelareserva.cliente")

    @Bean
    fun sagaCancelarReserva(): DirectExchange = DirectExchange("emiratads.cancelareserva")

    @Bean
    fun cancelarVoo(): Queue = Queue("emiratads.cancelavoo.cliente")

    @Bean
    fun sagaCancelarVoo(): DirectExchange = DirectExchange("emiratads.cancelavoo")

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
    fun bindingCancelarReserva(
        sagaCancelarReserva: DirectExchange,
        cancelarReserva: Queue
    ): Binding {
        return BindingBuilder.bind(cancelarReserva)
            .to(sagaCancelarReserva)
            .with(DEFAULT_ROUTING_KEY)
    }

    @Bean
    fun bindingConsultaSaldo(
        sagaCriarReserva: DirectExchange,
        consultaSaldo: Queue
    ): Binding {
        return BindingBuilder.bind(consultaSaldo)
            .to(sagaCriarReserva)
            .with("saldo")
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
    fun rabbitListenerContainerFactory(connectionFactory: ConnectionFactory): SimpleRabbitListenerContainerFactory {
        val factory = SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory)
        factory.setDefaultRequeueRejected(false)
        return factory
    }

}