package br.ufpr.dac.voo_service.resource.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import utils.validators.SomenteNumeros

data class VooInputDTO(
  var codigo: String?,
  @field:NotEmpty
  val data: String,
  @field:NotEmpty
  @field:SomenteNumeros
  val valor_passagem: Double,
  @field:SomenteNumeros
  val quantidade_poltronas_total: Int,
  @field:NotBlank
  val codigo_aeroporto_origem: String,
  @field:NotBlank
  val codigo_aeroporto_destino: String
)