package br.ufpr.dac.voo_service.resource

import utils.dto.AeroportoOutputDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost:3030"])
@RestController
@RequestMapping("/v1/aeroportos")
class AeroportoController (private val service: AeroportoService) {
    @GetMapping
    fun getAeroportos(): ResponseEntity<List<AeroportoOutputDTO>> {
        val aeroportos = service.getAllAeroportos()
        return ResponseEntity.ok().body(aeroportos)
    }
}