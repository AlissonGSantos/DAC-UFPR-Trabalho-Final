package br.ufpr.dac.reserva_service.resource

import br.ufpr.dac.reserva_service.resource.dto.PoltronasOcupadasDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import utils.dto.AlternaEstadoDTO
import utils.dto.ReservaOutputDTO

@RestController
@RequestMapping("v1/reservas")
class ReservaController(private val service: ReservaService) {

    @GetMapping("/poltronas/{voo}")
    fun getPoltronasOcupadas(@PathVariable voo: String): ResponseEntity<PoltronasOcupadasDTO>{
        val poltronas = service.listPoltronasOcupadas(voo)
        return ResponseEntity.ok(PoltronasOcupadasDTO(poltronas))
    }

    @GetMapping("/cliente/{codigo_cliente}")
    fun getReservasByCliente(@PathVariable codigo_cliente: Long): ResponseEntity<List<ReservaOutputDTO>>{
        val reservas = service.listReservasByCliente(codigo_cliente)
        return ResponseEntity.ok(reservas)
    }

    @GetMapping("/{codigo}")
    fun detailReserva(@PathVariable codigo: String): ResponseEntity<ReservaOutputDTO>{
        val reserva = service.detailReserva(codigo)
        return ResponseEntity.ok(reserva)
    }

    @PatchMapping("/{codigo}/estado")
    fun alterarEstado(@PathVariable codigo: String, @RequestBody estado: AlternaEstadoDTO){

    }
}