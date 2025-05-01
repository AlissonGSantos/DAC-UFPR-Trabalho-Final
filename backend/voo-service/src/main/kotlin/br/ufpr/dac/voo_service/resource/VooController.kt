package br.ufpr.dac.voo_service.resource

import utils.dto.VooOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import br.ufpr.dac.voo_service.resource.mapper.VooMapper
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/voos")
class VooController(private val service: VooService) {

    @GetMapping
    fun getVoos(
        @RequestParam(required = false) origem: String?,
        @RequestParam(required = false) destino: String?,
        @RequestParam(required = false) dataLimite: String?
    ): ResponseEntity<List<VooOutputDTO>> {
        val voos = when {
            origem != null && destino != null -> service.getVoosByAeroportos(origem, destino)
            dataLimite != null -> service.getVoosByDate(dataLimite)
            else -> service.getAllVoos()
        }
        return ResponseEntity.ok().body(voos)
    }

    @PostMapping
    fun createVoos(@RequestBody voo: VooInputDTO): ResponseEntity<VooOutputDTO> {
        val savedVoo = service.saveVoo(voo)
        return ResponseEntity.status(HttpStatus.CREATED).body(VooMapper.toDTO(savedVoo))
    }

    @GetMapping("/{id}")
    fun getVooById(@PathVariable id: String): ResponseEntity<VooOutputDTO> {
        val voo = service.getVooById(id)
        return ResponseEntity.ok().body(VooMapper.toDTO(voo))
    }
}
