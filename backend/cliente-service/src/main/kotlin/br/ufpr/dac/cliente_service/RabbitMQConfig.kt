package br.ufpr.dac.cliente_service

import br.ufpr.dac.cliente_service.resource.ClienteListener
import br.ufpr.dac.cliente_service.resource.ClienteService
import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig(private val clienteService: ClienteService) {

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
    fun bindingAutocadastro(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with("cliente")
    }

    @Bean
    fun bindingLogin(
        sagaLogin: DirectExchange,
        loginClientes: Queue
    ): Binding {
        return BindingBuilder.bind(loginClientes)
            .to(sagaLogin)
            .with("cliente")
    }

    @Bean
    fun clienteListener(): ClienteListener {
        return ClienteListener(clienteService)
    }

}