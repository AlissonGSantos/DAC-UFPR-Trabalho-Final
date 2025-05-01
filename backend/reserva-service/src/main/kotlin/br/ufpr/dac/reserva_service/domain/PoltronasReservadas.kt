package br.ufpr.dac.reserva_service.domain

import br.ufpr.dac.reserva_service.domain.embeddable.PoltronasReservadasId
import jakarta.persistence.*

@Entity
@Table(name = "poltronas_reservadas", schema = "emiratads_reserva_transaction")
data class PoltronasReservadas(
    @EmbeddedId
    val id: PoltronasReservadasId,
    val codigo_cliente: Long,
    val codigo_reserva: String
)