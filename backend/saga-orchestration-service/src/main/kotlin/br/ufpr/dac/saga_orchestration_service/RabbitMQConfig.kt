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
    fun sagaAutocadastro(): DirectExchange = DirectExchange("emiratads.autocadastro")

    @Bean
    fun sagaCriarReserva(): DirectExchange = DirectExchange("emiratads.criareserva")

    @Bean
    fun sagaCancelarReserva(): DirectExchange = DirectExchange("emiratads.cancelareserva")

    @Bean
    fun sagaCancelarVoo(): DirectExchange = DirectExchange("emiratads.cancelavoo")

    @Bean
    fun sagaRealizarVoo(): DirectExchange = DirectExchange("emiratads.realizavoo")
}