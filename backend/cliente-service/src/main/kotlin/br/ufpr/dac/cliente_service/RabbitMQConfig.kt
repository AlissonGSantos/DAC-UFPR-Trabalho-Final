package br.ufpr.dac.cliente_service

import br.ufpr.dac.cliente_service.resource.ClienteListener
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
        return Queue("emiratads.autocadastro.requests")
    }

    @Bean
    fun sagaAutocadastro(): DirectExchange {
        return DirectExchange("emiratads.autocadastro")
    }


    @Bean
    fun binding(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with("cliente")
    }

    @Bean
    fun clienteListener(): ClienteListener {
        return ClienteListener()
    }

}