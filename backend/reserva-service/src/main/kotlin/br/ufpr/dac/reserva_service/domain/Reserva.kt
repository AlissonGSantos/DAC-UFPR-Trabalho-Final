package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "reserva", schema = "emiratads_reserva_transaction")
data class Reserva (
    val codigo: String,
    val codigo_cliente: Long,
    val codigo_voo: Long,
    @OneToOne
    @Column(name = "estado_codigo")
    val estado: EstadoReserva,
    val quantidade_milhas: Double
)