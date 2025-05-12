package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.sagas.CancelarReservaSaga
import br.ufpr.dac.saga_orchestration_service.sagas.CriarReservaSaga
import jakarta.validation.constraints.NotBlank
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import utils.dto.ReservaInputDTO
import utils.dto.ReservaOutputDTO
import java.net.URI
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("v1/reservas")
@CrossOrigin(origins = ["\${gateway.url}"])
class ReservaController(private val sagaCriar: CriarReservaSaga, private val sagaCancelar: CancelarReservaSaga) {

    @PostMapping
    fun efetuarReserva(@RequestBody payload : ReservaInputDTO): ResponseEntity<ReservaOutputDTO> {
        val reserva = runBlocking {
            sagaCriar.executeSaga(payload)
        }

        return ResponseEntity.created(URI("/reserva/${reserva.codigo}")).body(reserva)
    }

    @DeleteMapping("/{codigo}")
    fun cancelarReserva(@PathVariable codigo: String): ResponseEntity<ReservaOutputDTO> {
        val reserva = runBlocking {
            sagaCancelar.executeSaga(codigo)
        }

        return ResponseEntity.ok(reserva)
    }

}