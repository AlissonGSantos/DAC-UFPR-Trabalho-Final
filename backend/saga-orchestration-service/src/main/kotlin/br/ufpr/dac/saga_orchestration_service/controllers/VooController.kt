package br.ufpr.dac.saga_orchestration_service.controllers

import org.springframework.web.bind.annotation.*
import utils.dto.AlternaEstadoDTO

@RestController
@RequestMapping("/v1/voos")
class VooController {

    @PatchMapping("/{codigo}/estado")
    fun alterarEstado(@PathVariable codigo: String, @RequestBody estado: AlternaEstadoDTO){

    }

    @DeleteMapping("/{codigo}")
    fun cancelarVoo(@PathVariable codigo: String){

    }
}