package br.ufpr.dac.voo_service.resource.mapper

import utils.dto.AeroportoOutputDTO
import br.ufpr.dac.voo_service.domain.Aeroporto
import br.ufpr.dac.voo_service.resource.dto.AeroportoInputDTO

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

        fun toDomain(aeroporto: AeroportoInputDTO): Aeroporto {
            return Aeroporto(
                aeroporto.codigo,
                aeroporto.nome,
                aeroporto.cidade,
                aeroporto.uf
            )
        }
    }
}
