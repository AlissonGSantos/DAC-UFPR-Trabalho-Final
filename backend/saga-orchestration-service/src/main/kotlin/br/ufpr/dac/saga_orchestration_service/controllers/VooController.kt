package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.sagas.CancelarVooSaga
import br.ufpr.dac.saga_orchestration_service.sagas.RealizarVooSaga
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import utils.dto.AlternaEstadoDTO
import utils.dto.VooOutputDTO

@RestController
@RequestMapping("/v1/voos")
class VooController(
    private val cancelarVoo: CancelarVooSaga,
    private val realizarVoo: RealizarVooSaga
) {

    @PatchMapping("/{codigo}/estado")
    fun alterarEstado(@PathVariable codigo: String, @RequestBody estado: AlternaEstadoDTO) {
        val voo = runBlocking {
            realizarVoo.executeSaga(codigo, estado)
        }
    }

    @DeleteMapping("/{codigo}")
    fun cancelarVoo(@PathVariable codigo: String): ResponseEntity<VooOutputDTO> {
        val voo = runBlocking {
            cancelarVoo.executeSaga(codigo)
        }

        return ResponseEntity.ok(voo)
    }
}