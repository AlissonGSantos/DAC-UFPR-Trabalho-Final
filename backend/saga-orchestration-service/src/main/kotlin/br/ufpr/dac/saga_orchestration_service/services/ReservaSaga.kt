package br.ufpr.dac.saga_orchestration_service.services

import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Service
import utils.dto.ReservaInputDTO

@Service
class ReservaSaga(private val template: RabbitTemplate) {

    fun executeSaga(payload: ReservaInputDTO){
        // Primeiro verifica os assentos disponíveis no voo e marca como ocupados (retorna dados do voo)
        // Registra a reserva
        // Desconta as milhas do cliente (já enviar no formato de Transaction)

        // Pelo menos 4 filas*
    }

}