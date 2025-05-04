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
import java.lang.IllegalArgumentException
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

    fun getVoosFromDate(data: String): List<VooOutputDTO> {
        val dataInicio = ZonedDateTime.parse(data)
        val voos = repository.findAll().filter { voo ->
            voo.data.isAfter(dataInicio) || voo.data.isEqual(dataInicio)
        }
        return voos.map { VooMapper.toDTO(it) }
    }

    fun getVoosByDateRange(dataInicio: String, dataFim: String): List<VooOutputDTO> {
        val inicio = ZonedDateTime.parse(dataInicio)
        val fim = ZonedDateTime.parse(dataFim)
        val voos = repository.findAll().filter { voo ->
            (voo.data.isAfter(inicio) || voo.data.isEqual(inicio)) &&
            (voo.data.isBefore(fim) || voo.data.isEqual(fim))
        }
        return voos.map { VooMapper.toDTO(it) }
    }

    fun getVooById(id: String): Voo {
        return repository.findById(id).orElseThrow { ResourceNotFoundException("Voo não encontrado com o id ${id}") }
    }

    fun saveVoo(input: VooInputDTO): Voo {
        input.codigo = "TADS" + (repository.count() + 1).toString().padStart(4, '0')
        val estado = estadoVooRepository.findById(EstadoVooEnum.CONFIMADO.codigo).get()
        val voo = VooMapper.toDomain(input)
        voo.estado = estado
        return repository.save(voo)
    }

    fun cancelaVoo(codigo: String): Voo {
        val voo = repository.findById(codigo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: $codigo") }
        if (voo.estado!!.codigo != EstadoVooEnum.CONFIMADO.codigo) {
            throw IllegalArgumentException("Um voo só pode ser cancelado no estado CONFIRMADO")
        }
        val estado = estadoVooRepository.findById(EstadoVooEnum.CANCELADO.codigo).get()
        voo.estado = estado
        return repository.save(voo)
    }

    fun realizaVoo(codigo: String): Voo {
        val voo = repository.findById(codigo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: $codigo") }
        if (voo.estado!!.codigo != EstadoVooEnum.CONFIMADO.codigo) {
            throw IllegalArgumentException("Um voo só pode ser realizado no estado CONFIRMADO")
        }
        val estado = estadoVooRepository.findById(EstadoVooEnum.REALIZADO.codigo).get()
        voo.estado = estado
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

    fun liberaLotacao(codigoVoo: String, quantidadePoltronas: Int): VooOutputDTO {
        val voo = repository.findById(codigoVoo)
            .orElseThrow { ResourceNotFoundException("Voo não encontrado com o id: ${codigoVoo}") }

        voo.quantidade_poltronas_ocupadas -= quantidadePoltronas

        return VooMapper.toDTO(repository.save(voo))
    }
}
