package br.ufpr.dac.saga_orchestration_service.controllers

import br.ufpr.dac.saga_orchestration_service.sagas.CancelarVooSaga
import br.ufpr.dac.saga_orchestration_service.sagas.RealizarVooSaga
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import utils.dto.AlternaEstadoDTO
import utils.dto.VooOutputDTO
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("/v1/voos")
@CrossOrigin(origins = ["\${gateway.url}"])
class VooController(
    private val cancelarVoo: CancelarVooSaga,
    private val realizarVoo: RealizarVooSaga
) {

    @PatchMapping("/{codigo}/estado")
    fun alterarEstado(@PathVariable codigo: String, @RequestBody estado: AlternaEstadoDTO): ResponseEntity<VooOutputDTO> {
        val voo = runBlocking {
            if(estado.estado == "CANCELADO")
                 cancelarVoo.executeSaga(codigo)
            else
                realizarVoo.executeSaga(codigo, estado)
        }
        return ResponseEntity.ok(voo)
    }

    @DeleteMapping("/{codigo}")
    fun cancelarVoo(@PathVariable codigo: String): ResponseEntity<VooOutputDTO> {
        val voo = runBlocking {
            cancelarVoo.executeSaga(codigo)
        }

        return ResponseEntity.ok(voo)
    }
}