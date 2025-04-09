package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.repository.IVooRepository
import org.springframework.stereotype.Service
import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO
import br.ufpr.dac.voo_service.domain.Voo

@Service
class VooService(private val repository : IVooRepository) {
    fun getAllVoos(): List<VooOutputDTO> {
        return repository.findAll().map { VooOutputDTO(it) }
    }

    fun getVooById(id: Long){
      return repository.findById(id.toString())
    }

    fun saveVoo(voo: VooInputDTO): Voo {
      return repository.save(voo.toVoo)
    }

    fun updateVoo(id: Long, vooDTO: VooInputDTO): Voo {
      var voo = repository.findById(id.toString()).orElseThrow{ IllegalArgumentException("Voo não encontrado com o id: ${vooDTO.id}")}

      voo.estado = vooDTO.estado

      return repository.save(voo)
    }

    fun deleteVoo(id: Long) {
      return repository.deleteById(id.toString())
    }
}
