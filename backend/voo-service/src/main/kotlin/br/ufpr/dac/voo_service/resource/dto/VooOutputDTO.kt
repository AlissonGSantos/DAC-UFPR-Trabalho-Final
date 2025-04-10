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
    constructor(voo: Voo) : this(
        codigo = voo.codigo,
        data = voo.data,
        valor_passagem = voo.valor_passagem,
        quantidade_poltronas_total = voo.quantidade_poltronas_total,
        quantidade_poltronas_ocupadas = voo.quantidade_poltronas_ocupadas,
        estado = voo.estado,
        aeroporto_origem = AeroportoOutputDTO(voo.aeroporto_origem),
        aeroporto_destino = AeroportoOutputDTO(voo.aeroporto_destino),
        ativo = voo.ativo
    )

    fun toVoo(): Voo {
      return Voo(codigo,data,valor_passagem,quantidade_poltronas_total,
      quantidade_poltronas_ocupadas,estado,aeroporto_origem.toAeroporto(),
      aeroporto_destino.toAeroporto(),ativo)
    }
}
