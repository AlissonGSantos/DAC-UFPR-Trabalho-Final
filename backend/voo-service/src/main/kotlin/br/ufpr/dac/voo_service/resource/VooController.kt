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

    @PostMapping
    fun createVoos(@RequestBody voo: VooInputDTO): ResponseEntity<VooOutputDTO> {
      val savedVoo = service.saveVoo(voo)
      return ResponseEntity.status(HttpStatus.CREATED).body(VooOutputDTO(savedVoo))
    }

    @PutMapping("/id")
    fun updateVoo(@PathVariable id: Long, @RequestBody vooDTO: VooInputDTO): ResponseEntity<VooOutputDTO> {
      val updatedVoo = service.updateVoo(id, vooDTO)
      return ResponseEntity.ok().body(VooOutputDTO(updatedVoo))
    }

    @DeleteMapping("/id")
    fun deleteVoo(@PathVariable id: Long): ResponseEntity<VooOutputDTO> {
      val deletedVoo = service.deleteVoo(id)
      return ResponseEntity.ok().body(VooOutputDTO(deletedVoo))
    }

    @GetMapping("/id")
    fun getVooById(@PathVariable id: Long): ResponseEntity<VooOutputDTO> {
      val voo = service.getVooById(id)
      return ResponseEntity.ok().body(VooOutputDTO(voo))
    }
}
