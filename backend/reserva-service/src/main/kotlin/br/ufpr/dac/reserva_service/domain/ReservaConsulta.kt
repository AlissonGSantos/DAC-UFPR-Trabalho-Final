package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "reserva", schema = "emiratads_reserva_access")
data class ReservaConsulta(
    @Id
    val codigo: String,
    @Column(name = "poltronas", columnDefinition = "integer[]")
    val poltronas: List<Int>,
    val codigo_voo: String,
    val codigo_cliente: Long,
    val estado: String,
    val data: LocalDateTime,
    val quantidade_milhas: Double
)