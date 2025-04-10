package br.ufpr.dac.voo_service.resource.dto

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.ZonedDateTime
import br.ufpr.dac.voo_service.domain.EstadoVoo
import br.ufpr.dac.voo_service.domain.Aeroporto
import br.ufpr.dac.voo_service.domain.Voo

data class VooInputDTO(

  @NotBlank
  var codigo: String,
  val data: ZonedDateTime,
  val valor_passagem: Double,
  val quantidade_poltronas_total: Int,
  val quantidade_poltronas_ocupadas: Int,
  val estado: EstadoVoo,
  val aeroporto_origem: Aeroporto
  val aeroporto_destino: Aeroporto
  val ativo: Boolean
) {
  fun toVoo(): Voo {
    return Voo(codigo = codigo, data = data, valor_passagem = valor_passagem,quantidade_poltronas_total = quantidade_poltronas_total,
    quantidade_poltronas_ocupadas = quantidade_poltronas_ocupadas, estado = estado,
     aeroporto_origem = aeroporto_origem, aeroporto_destino = aeroporto_destino, ativo = ativo)
  }
}
