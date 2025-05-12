package br.ufpr.dac.reserva_service.resource

import br.ufpr.dac.reserva_service.resource.dto.PoltronasOcupadasDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import utils.dto.AlternaEstadoDTO
import utils.dto.ReservaOutputDTO
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("v1/reservas")
@CrossOrigin(origins = ["\${gateway.url}"])
class ReservaController(private val service: ReservaService) {

    @GetMapping("/poltronas/{voo}")
    fun getPoltronasOcupadas(@PathVariable voo: String): ResponseEntity<PoltronasOcupadasDTO> {
        val poltronas = service.listPoltronasOcupadas(voo)
        return ResponseEntity.ok(PoltronasOcupadasDTO(poltronas))
    }

    @GetMapping("/cliente/{codigo_cliente}")
    fun getReservasByCliente(@PathVariable codigo_cliente: Long): ResponseEntity<List<ReservaOutputDTO>> {
        val reservas = service.listReservasByCliente(codigo_cliente)
        return ResponseEntity.ok(reservas)
    }

    @GetMapping("/{codigo}")
    fun detailReserva(@PathVariable codigo: String): ResponseEntity<ReservaOutputDTO> {
        val reserva = service.detailReserva(codigo)
        return ResponseEntity.ok(reserva)
    }

    @PatchMapping("/{codigo}/estado")
    fun alterarEstado(
        @PathVariable codigo: String,
        @RequestBody payload: AlternaEstadoDTO
    ): ResponseEntity<ReservaOutputDTO> {
        val reserva = service.alterarEstado(codigo, payload)
        return ResponseEntity.ok(reserva)
    }
}