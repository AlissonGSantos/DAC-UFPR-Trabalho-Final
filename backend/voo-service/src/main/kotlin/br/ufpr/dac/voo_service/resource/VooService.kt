package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.repository.IVooRepository
import org.springframework.stereotype.Service
import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import br.ufpr.dac.voo_service.domain.Voo

@Service
class VooService(private val repository : IVooRepository) {
    fun getAllVoos(): List<VooOutputDTO> {
        return repository.findAll().map { VooOutputDTO(it) }
    }

    fun getVooById(id: String): Voo {
      return repository.findById(id).orElseThrow{ IllegalArgumentException("Voo não encontrado com o id ${id}")}
    }

    fun saveVoo(voo: VooInputDTO): Voo {
      voo.codigo = "TADS" + repository.count()
      return repository.save(VooInputDTO.toVoo(voo))
    }

    fun updateVoo(id: String, vooDTO: VooInputDTO): Voo {
      var voo = repository.findById(id.toString()).orElseThrow{ IllegalArgumentException("Voo não encontrado com o id: ${vooDTO.codigo}")}

      voo.estado = vooDTO.estado
      voo.quantidade_poltronas_ocupadas = vooDTO.quantidade_poltronas_ocupadas

      return repository.save(voo)
    }

    fun deleteVoo(id: String): Voo {
      val voo = repository.findById(id).orElseThrow{ IllegalArgumentException("Voo não encontrado com o id: ${id}")}
      repository.deleteById(id.toString())
      return VooOutputDTO.toVoo(voo)
}
