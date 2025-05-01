package br.ufpr.dac.voo_service.resource.dto

import br.ufpr.dac.voo_service.domain.EstadoVoo
import jakarta.validation.Valid
import jakarta.validation.constraints.Future
import jakarta.validation.constraints.NotEmpty
import utils.validators.SomenteNumeros
import java.time.ZonedDateTime

data class VooInputDTO(
  var codigo: String?,
  @field:NotEmpty
  @field:Future
  val data: ZonedDateTime,
  @field:NotEmpty
  @field:SomenteNumeros
  val valor_passagem: Double,
  @field:SomenteNumeros
  val quantidade_poltronas_total: Int,
  @field:Valid
  @field:NotEmpty
  val aeroporto_origem: AeroportoInputDTO,
  @field:Valid
  @field:NotEmpty
  val aeroporto_destino: AeroportoInputDTO
)