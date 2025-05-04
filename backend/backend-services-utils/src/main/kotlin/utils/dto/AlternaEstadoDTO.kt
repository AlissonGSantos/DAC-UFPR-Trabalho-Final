package utils.dto

import jakarta.validation.constraints.NotBlank

data class AlternaEstadoDTO(
    @field:NotBlank
    val estado: String
)
