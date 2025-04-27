package br.ufpr.dac.voo_service.resource.dto

import br.ufpr.dac.voo_service.domain.Voo
import java.time.ZonedDateTime
import br.ufpr.dac.voo_service.domain.EstadoVoo

data class VooOutputDTO(
    val codigo: String,
    val data: ZonedDateTime,
    val valor_passagem: Double,
    val quantidade_poltronas_total: Int,
    val quantidade_poltronas_ocupadas: Int,
    val estado: EstadoVoo,
    val aeroporto_origem: AeroportoOutputDTO,
    val aeroporto_destino: AeroportoOutputDTO
    val ativo: Boolean
) {
}
