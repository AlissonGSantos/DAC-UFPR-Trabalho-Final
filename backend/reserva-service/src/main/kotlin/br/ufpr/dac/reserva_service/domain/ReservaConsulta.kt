package br.ufpr.dac.reserva_service.domain

import br.ufpr.dac.reserva_service.domain.embeddable.ReservaConsultaId
import jakarta.persistence.*
import java.time.ZonedDateTime

@Entity
@Table(name = "reserva", schema = "emiratads_reserva_access")
data class ReservaConsulta(
    @EmbeddedId
    val id: ReservaConsultaId,
    @Column(name = "poltronas", columnDefinition = "integer[]")
    val poltronas: List<Int>,
    val codigo_cliente: Long,
    val estado: String,
    val data: ZonedDateTime,
    val quantidade_milhas: Float
)