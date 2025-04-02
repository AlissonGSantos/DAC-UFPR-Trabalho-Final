package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.repository.IAeroportoRepository
import br.ufpr.dac.voo_service.resource.dto.AeroportoOutputDTO
import org.springframework.stereotype.Service

@Service
class AeroportoService (private val repository: IAeroportoRepository) {
    fun getAllAeroportos(): List<AeroportoOutputDTO> {
        return repository.findAll().map { AeroportoOutputDTO(it) }
    }
}