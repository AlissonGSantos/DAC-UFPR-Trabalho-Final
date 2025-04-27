package br.ufpr.dac.voo_service.resource.dto

import jakarta.persistence.*
import jakarta.validation.constraints.*

data class AeroportoInputDTO(
  
  @NotBlank
  val codigo: String,
  @NotBlank
  val nome: String,
  val cidade: String,
  val uf: String,
  val ativo: Boolean
)
