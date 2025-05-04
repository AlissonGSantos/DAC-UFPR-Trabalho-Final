package br.ufpr.dac.reserva_service.utils

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.rabbitmq.client.Channel
import org.springframework.amqp.core.Message
import org.springframework.amqp.core.MessageBuilder
import org.springframework.amqp.rabbit.listener.api.RabbitListenerErrorHandler
import org.springframework.amqp.rabbit.support.ListenerExecutionFailedException
import org.springframework.stereotype.Component
import utils.dto.RabbitMessageDTO
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime

@Component("customErrorHandler")
class CustomRabbitListenerErrorHandler : RabbitListenerErrorHandler {
    override fun handleError(
        message: Message?,
        channel: Channel?,
        message2: org.springframework.messaging.Message<*>?,
        exception: ListenerExecutionFailedException?
    ): Message {
        val gson: Gson = GsonBuilder()
            .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
            .create()
        val body: RabbitMessageDTO<String> = exception?.let {
            if (it.cause != null){
                val cause = it.cause as Exception
                RabbitMessageDTO(false, cause.message, cause.javaClass.simpleName)
            } else {
                RabbitMessageDTO(false, it.message, it.javaClass.simpleName)
            }
        } ?: RabbitMessageDTO(false, "Erro no processamento", "Exception")

        return MessageBuilder.withBody(gson.toJson(body).encodeToByteArray())
            .andProperties(message?.messageProperties)
            .build()
    }


}