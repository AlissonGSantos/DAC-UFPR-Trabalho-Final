package br.ufpr.dac.reserva_service.resource.cqrs

import br.ufpr.dac.reserva_service.repository.IConsultaRepository
import br.ufpr.dac.reserva_service.resource.dto.ReservaConsultaInputDTO
import org.springframework.stereotype.Service
import utils.dto.ReservaUpdateEstadoDTO

@Service
class AsyncReservaService(private val repository: IConsultaRepository) {

    fun gravarReserva(reserva: List<ReservaConsultaInputDTO>){
        reserva.forEach {
            repository.save(
                it.codigo,
                it.codigo_cliente,
                it.codigo_voo,
                it.estado,
                it.data,
                it.poltrona,
                it.quantidade_milhas
            )
        }
    }

    fun editarReserva(reserva: ReservaUpdateEstadoDTO){
        repository.update(reserva.estado, reserva.data, reserva.codigo)
    }
}