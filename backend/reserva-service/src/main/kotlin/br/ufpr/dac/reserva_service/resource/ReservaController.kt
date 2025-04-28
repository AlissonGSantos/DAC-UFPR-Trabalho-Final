package br.ufpr.dac.reserva_service.resource

import br.ufpr.dac.reserva_service.resource.dto.PoltronasOcupadasDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v1/reserva")
class ReservaController(private val service: ReservaService) {

    @GetMapping("/poltronas/{voo}")
    fun getPoltronasOcupadas(@PathVariable voo: String): ResponseEntity<PoltronasOcupadasDTO>{
        val poltronas = service.listPoltronasOcupadas(voo)
        return ResponseEntity.ok(PoltronasOcupadasDTO(poltronas))
    }
}