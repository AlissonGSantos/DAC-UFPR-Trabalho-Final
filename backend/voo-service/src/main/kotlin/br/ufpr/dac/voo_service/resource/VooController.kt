package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/voos")
class VooController (private val service: VooService) {

    @GetMapping
    fun getVoos(): ResponseEntity<List<VooOutputDTO>> {
        val voos = service.getAllVoos()
        return ResponseEntity.ok().body(voos)
    }
}