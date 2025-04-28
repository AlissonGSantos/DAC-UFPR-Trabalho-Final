package br.ufpr.dac.voo_service.resource

import br.ufpr.dac.voo_service.domain.EstadoVooEnum
import br.ufpr.dac.voo_service.repository.IVooRepository
import org.springframework.stereotype.Service
import utils.dto.VooOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import br.ufpr.dac.voo_service.domain.Voo
import br.ufpr.dac.voo_service.repository.IEstadoVooRepository
import br.ufpr.dac.voo_service.resource.mapper.VooMapper
import utils.exceptions.ResourceNotFoundException
import utils.exceptions.ResourcesConflictException
import java.time.ZonedDateTime

@Service
class VooService(private val repository: IVooRepository, private val estadoVooRepository: IEstadoVooRepository) {
    fun getAllVoos(): List<VooOutputDTO> {
        return repository.findAll().map { VooMapper.toDTO(it) }
    }

    fun getVoosByAeroportos(origem: String, destino: String): List<VooOutputDTO> {
        val voos = repository.findAll().filter { voo ->
            (voo.aeroporto_origem.codigo == origem) &&
            (voo.aeroporto_destino.codigo == destino)
        }
        return voos.map { VooMapper.toDTO(it) }
    }

    fun getVoosByDate(dataLimite: String): List<VooOutputDTO> {
        val limite = ZonedDateTime.parse(dataLimite)
        val agora = ZonedDateTime.now()
        val voos = repository.findAll().filter { voo ->
            voo.data.isAfter(agora) && voo.data.isBefore(limite)
        }
        return voos.map { VooMapper.toDTO(it) }
    }

    fun getVooById(id: String): Voo {
        return repository.findById(id).orElseThrow { ResourceNotFoundException("Voo não encontrado com o id ${id}") }
    }

    fun saveVoo(voo: VooInputDTO): Voo {
        voo.codigo = "TADS" + (repository.count() + 1).toString().padStart(4, '0')
        val estado = estadoVooRepository.findById(EstadoVooEnum.CONFIMADO.codigo)
            .orElseThrow { ResourceNotFoundException("Estado de voo não encontrado") }
        voo.estado = estado
        return repository.save(VooMapper.toDomain(voo))
    }

    fun updateVoo(id: String, vooDTO: VooInputDTO): Voo {
        val voo = repository.findById(id)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: ${vooDTO.codigo}") }

        voo.estado = vooDTO.estado
        voo.quantidade_poltronas_ocupadas = vooDTO.quantidade_poltronas_ocupadas!!

        return repository.save(voo)
    }

    fun verificaEAtualizaLotacao(codigoVoo: String, quantidadePoltronas: Int): VooOutputDTO {
        val voo = repository.findById(codigoVoo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: ${codigoVoo}") }

        val poltronasLivres = voo.quantidade_poltronas_total - voo.quantidade_poltronas_ocupadas
        if (poltronasLivres < quantidadePoltronas){
            throw ResourcesConflictException("Não há poltronas suficientes disponíveis para a reserva.")
        }

        voo.quantidade_poltronas_ocupadas += quantidadePoltronas

        return VooMapper.toDTO(repository.save(voo))
    }

}
