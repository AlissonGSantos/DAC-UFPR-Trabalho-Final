package br.ufpr.dac.voo_service.resource.mapper

import br.ufpr.dac.voo_service.domain.Aeroporto
import utils.dto.VooOutputDTO
import br.ufpr.dac.voo_service.domain.Voo
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

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

        fun toDomain(voo: VooInputDTO, aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto): Voo {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX")
            return Voo(
                voo.codigo ?: "",
                ZonedDateTime.parse(voo.data.replace("Z", ""), formatter),
                voo.valor_passagem,
                voo.quantidade_poltronas_total,
                0,
                null,
                aeroportoOrigem,
                aeroportoDestino
            )
        }
    }
}
