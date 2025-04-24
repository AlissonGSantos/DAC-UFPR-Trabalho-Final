package br.ufpr.dac.voo_service.resource.mapper

import br.ufpr.dac.voo_service.resource.dto.VooOutputDTO
import br.ufpr.dac.voo_service.domain.Voo
import br.ufpr.dac.voo_service.resource.dto.AeroportoOutputDTO
import br.ufpr.dac.voo_service.resource.dto.VooInputDTO

class VooMapper {
 companion object{
   fun toDTO(voo: Voo): VooOutputDTO {
     return VooOutputDTO(
      voo.codigo,
      voo.data,
      voo.valor_passagem,
      voo.quantidade_poltronas_total,
      voo.quantidade_poltronas_ocupadas,
      voo.estado,
      voo.aeroporto_origem,
      voo.aeroporto_destino,
      voo.ativo
     )
   }

   fun toDomain(voo: VooInputDTO): Voo {
     return Voo(
      voo.codigo,
      voo.data,
      voo.valor_passagem,
      voo.quantidade_poltronas_total,
      voo.quantidade_poltronas_ocupadas,
      voo.estado,
      voo.aeroporto_origem,
      voo.aeroporto_destino,
      voo.ativo

     )
   }
 }
}
