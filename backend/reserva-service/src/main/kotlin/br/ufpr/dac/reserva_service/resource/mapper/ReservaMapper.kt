package br.ufpr.dac.reserva_service.resource.mapper

import br.ufpr.dac.reserva_service.domain.ReservaConsulta
import utils.dto.ReservaOutputDTO

class ReservaMapper {
    companion object{
        fun toDTO(reserva: ReservaConsulta): ReservaOutputDTO {
            return ReservaOutputDTO(
                reserva.id.codigo,
                reserva.data,
                reserva.estado,
                reserva.quantidade_milhas,
                reserva.codigo_cliente,
                null,
                reserva.poltronas,
                null,
                reserva.id.codigo_voo
            )
        }
    }
}