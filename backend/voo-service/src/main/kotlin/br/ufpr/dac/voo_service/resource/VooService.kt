package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.repository.IVooRepository
import org.springframework.stereotype.Service
import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO

@Service
class VooService(private val repository : IVooRepository) {
    fun getAllVoos(): List<VooOutputDTO> {
        return repository.findAll().map { VooOutputDTO(it) }
    }
}