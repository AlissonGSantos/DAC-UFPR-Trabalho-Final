package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "reserva", schema = "emiratads_reserva_transaction")
data class Reserva (
    @Id
    val codigo: String,
    val codigo_cliente: Long,
    val codigo_voo: String,
    @OneToOne
    @JoinColumn(name = "estado_codigo")
    var estado: EstadoReserva,
    val quantidade_milhas: Double
)