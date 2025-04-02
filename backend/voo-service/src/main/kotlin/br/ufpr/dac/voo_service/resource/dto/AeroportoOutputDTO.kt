package br.ufpr.dac.voo_service.resource.dto

import br.ufpr.dac.voo_service.domain.Aeroporto

data class AeroportoOutputDTO (
    val codigo: String,
    val nome: String,
    val cidade: String,
    val uf: String
) {
    constructor(aeroporto: Aeroporto) : this(
        codigo = aeroporto.codigo,
        nome = aeroporto.nome,
        cidade = aeroporto.cidade,
        uf = aeroporto.uf
    )
}