package utils.dto

import jakarta.validation.constraints.NotBlank
import utils.validators.Uf

class EnderecoDTO (
    @field:NotBlank
    val cep: String,

    @field:NotBlank
    val uf: String,

    @field:NotBlank
    val cidade: String,

    @field:NotBlank
    val bairro: String,

    @field:NotBlank
    val rua: String,

    @field:NotBlank
    val numero: String,

    val complemento: String
)