package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.sagas.CriarReservaSaga
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import utils.dto.ReservaInputDTO
import utils.dto.ReservaOutputDTO
import java.net.URI

@RestController
class ReservaController(private val saga: CriarReservaSaga) {

    @PostMapping("reserva")
    fun efetuarReserva(@RequestBody payload : ReservaInputDTO): ResponseEntity<ReservaOutputDTO> {
        val reserva = runBlocking {
            saga.executeSaga(payload)
        }

        return ResponseEntity.created(URI("/reserva/${reserva.codigo}")).body(reserva)
    }
}