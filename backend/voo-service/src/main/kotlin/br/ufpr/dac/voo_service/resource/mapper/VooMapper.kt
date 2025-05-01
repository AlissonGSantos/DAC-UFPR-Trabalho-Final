package br.ufpr.dac.voo_service.resource.mapper

import utils.dto.VooOutputDTO
import br.ufpr.dac.voo_service.domain.Voo
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO

class VooMapper {
    companion object {
        fun toDTO(voo: Voo): VooOutputDTO {
            return VooOutputDTO(
                voo.codigo,
                voo.data,
                voo.valor_passagem,
                voo.quantidade_poltronas_total,
                voo.quantidade_poltronas_ocupadas,
                voo.estado!!.descricao,
                AeroportoMapper.toDTO(voo.aeroporto_origem),
                AeroportoMapper.toDTO(voo.aeroporto_destino)
            )
        }

        fun toDomain(voo: VooInputDTO): Voo {
            return Voo(
                voo.codigo ?: "",
                voo.data,
                voo.valor_passagem,
                voo.quantidade_poltronas_total,
                0,
                null,
                AeroportoMapper.toDomain(voo.aeroporto_origem),
                AeroportoMapper.toDomain(voo.aeroporto_destino)
            )
        }
    }
}
