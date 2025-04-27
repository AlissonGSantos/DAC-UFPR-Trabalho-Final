package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
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
    fun updateVoo(@PathVariable id: String, @RequestBody vooDTO: VooInputDTO): ResponseEntity<VooOutputDTO> {
      val updatedVoo = service.updateVoo(id, vooDTO)
      return ResponseEntity.ok().body(VooOutputDTO(updatedVoo))
    }



    @GetMapping("/id")
    fun getVooById(@PathVariable id: String): ResponseEntity<VooOutputDTO> {
      val voo = service.getVooById(id)
      return ResponseEntity.ok().body(VooOutputDTO(voo))
    }
}
