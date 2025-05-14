package br.ufpr.dac.saga_orchestration_service.utils

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Service

@Service
class RabbitUtils(private val template: RabbitTemplate) {

    suspend fun asyncSendAndReceive(exchange: String, routingKey: String, message: String): String {
        return withContext(Dispatchers.IO) {
            template.convertSendAndReceive(exchange, routingKey, message) as String
        }
    }

    fun asyncSend(exchange: String, routingKey: String, message: String) {
        template.convertAndSend(exchange, routingKey, message)
    }
}