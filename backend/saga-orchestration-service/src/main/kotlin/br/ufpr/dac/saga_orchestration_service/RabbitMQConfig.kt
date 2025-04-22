package br.ufpr.dac.saga_orchestration_service

import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.DirectExchange
import org.springframework.amqp.core.Queue
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.amqp.support.converter.RemoteInvocationAwareMessageConverterAdapter
import org.springframework.amqp.support.converter.SimpleMessageConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig {

    @Bean
    fun rabbitTemplate(connectionFactory: ConnectionFactory): RabbitTemplate {
        val rabbitTemplate = RabbitTemplate(connectionFactory)
        rabbitTemplate.setReplyTimeout(60000)
        rabbitTemplate.messageConverter = RemoteInvocationAwareMessageConverterAdapter(SimpleMessageConverter())
        return rabbitTemplate
    }

    @Bean
    fun sagaAutocadastro(): DirectExchange {
        return DirectExchange("emiratads.autocadastro")
    }

    @Bean
    fun bindingFuncionario(exchange: DirectExchange, filaFuncionario: Queue): Binding {
        return BindingBuilder.bind(filaFuncionario)
            .to(exchange)
            .with("funcionario") // Routing key compatível com o controller
    }

    @Bean
    fun bindingAuth(exchange: DirectExchange, filaAuth: Queue): Binding {
        return BindingBuilder.bind(filaAuth)
            .to(exchange)
            .with("auth") // Routing key compatível com o controller
    }

    @Bean
    fun autocadastroRequests(): Queue {
        return Queue("emiratads.autocadastro.funcionario")
    }

    @Bean
    fun bindingAutocadastro(
        sagaAutocadastro: DirectExchange,
        autocadastroRequests: Queue
    ): Binding {
        return BindingBuilder.bind(autocadastroRequests)
            .to(sagaAutocadastro)
            .with("funcionario")
    }

}