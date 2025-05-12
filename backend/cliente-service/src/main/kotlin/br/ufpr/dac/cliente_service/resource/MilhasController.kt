package br.ufpr.dac.cliente_service.resource

import utils.dto.ExtratoDTO
import br.ufpr.dac.cliente_service.resource.dto.MilhasCompraDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import utils.dto.ClienteOutputDTO
import org.springframework.beans.factory.annotation.Value

@RestController
@RequestMapping("/clientes/{codigo}/milhas")
@CrossOrigin(origins = ["\${gateway.url}"])
class MilhasController(private val service: MilhasService) {

    @PutMapping
    fun comprarMilhas(@PathVariable codigo: Long, @RequestBody milhas: MilhasCompraDTO): ResponseEntity<ClienteOutputDTO> {
        val response = service.comprarMilhas(codigo, milhas)
        return ResponseEntity.ok(response)
    }

    @GetMapping
    fun emitirExtrato(@PathVariable codigo: Long): ResponseEntity<ExtratoDTO> {
        val extrato = service.emitirExtrato(codigo)
        return ResponseEntity.ok(extrato)
    }
}