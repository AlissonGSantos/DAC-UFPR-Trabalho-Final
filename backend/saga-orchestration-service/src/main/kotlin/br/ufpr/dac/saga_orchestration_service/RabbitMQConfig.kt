package br.ufpr.dac.saga_orchestration_service

import org.springframework.amqp.core.DirectExchange
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
    fun sagaCriarReserva(): DirectExchange {
        return DirectExchange("emiratads.criareserva")
    }

}