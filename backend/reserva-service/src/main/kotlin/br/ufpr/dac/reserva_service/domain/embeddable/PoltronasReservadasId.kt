package br.ufpr.dac.reserva_service.domain.embeddable

import jakarta.persistence.Embeddable
import java.io.Serializable

@Embeddable
data class PoltronasReservadasId(
    val codigo: Int,
    val codigo_voo: String
) : Serializable