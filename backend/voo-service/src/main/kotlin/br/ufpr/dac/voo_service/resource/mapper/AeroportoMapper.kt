package br.ufpr.dac.voo_service.resource.mapper

import utils.dto.AeroportoOutputDTO
import br.ufpr.dac.voo_service.domain.Aeroporto

class AeroportoMapper {
    companion object {
        fun toDTO(aeroporto: Aeroporto): AeroportoOutputDTO {
            return AeroportoOutputDTO(
                aeroporto.codigo,
                aeroporto.nome,
                aeroporto.cidade,
                aeroporto.uf
            )
        }
    }
}
