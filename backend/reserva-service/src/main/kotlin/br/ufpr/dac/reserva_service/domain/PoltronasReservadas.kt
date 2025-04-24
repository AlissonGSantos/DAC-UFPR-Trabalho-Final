package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "poltronas_reservadas", schema = "emiratads_reserva_transaction")
data class PoltronasReservadas(
    @Id
    val codigo: Int,
    @Id
    val codigo_voo: String,
    val codigo_cliente: Long,

    @ManyToOne
    @JoinColumn(name = "codigo_reserva")
    val reserva: Reserva
)
