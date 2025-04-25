package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "historico_reserva", schema = "emiratads_reserva_transaction")
data class HistoricoReserva(
    @Id
    val data: LocalDateTime,
    @Id
    @ManyToOne
    @JoinColumn(name = "codigo_reserva")
    val reserva: Reserva,
    @OneToOne
    @Column(name = "estado_old")
    val estadoAntigo: EstadoReserva,
    @OneToOne
    @Column(name = "estado_new")
    val estadoNovo: EstadoReserva
)