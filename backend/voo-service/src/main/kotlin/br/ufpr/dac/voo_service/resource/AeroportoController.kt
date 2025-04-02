package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.resource.dto.AeroportoOutputDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/aeroportos")
class AeroportoController (private val service: AeroportoService) {
    @GetMapping
    fun getAeroportos(): ResponseEntity<List<AeroportoOutputDTO>> {
        val aeroportos = service.getAllAeroportos()
        return ResponseEntity.ok().body(aeroportos)
    }
}