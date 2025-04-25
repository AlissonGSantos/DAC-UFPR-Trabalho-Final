package br.ufpr.dac.saga_orchestration_service.controllers

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import utils.dto.ReservaInputDTO

@RestController
class ReservaController {

    @PostMapping("reserva")
    fun efetuarReserva(@RequestBody payload : ReservaInputDTO){

    }
}