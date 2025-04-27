package br.ufpr.dac.voo_service.resource.dto

import br.ufpr.dac.voo_service.domain.Aeroporto

data class AeroportoOutputDTO (
    val codigo: String,
    val nome: String,
    val cidade: String,
    val uf: String,
    val ativo: Boolean
) {
 }
