package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "reserva", schema = "emiratads_reserva_access")
data class ReservaConsulta (
    val codigo: String,
    val codigo_cliente: Long,
    val codigo_voo: Long,
    val estado: String,
    val data: LocalDateTime,
    val poltrona: List<Int>,
    val quantidade_milhas: Double
)