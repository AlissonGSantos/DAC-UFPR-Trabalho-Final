package br.ufpr.dac.voo_service.resource.dto

import jakarta.validation.constraints.*

data class AeroportoInputDTO(
  @field:NotBlank
  val codigo: String,
  @field:NotBlank
  val nome: String,
  @field:NotBlank
  val cidade: String,
  @field:NotBlank
  val uf: String
)