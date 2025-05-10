package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.*
import java.time.LocalDateTime
import java.time.ZonedDateTime

@Entity
@Table(name = "historico_reserva", schema = "emiratads_reserva_transaction")
data class HistoricoReserva(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long = 0L,
    val data: ZonedDateTime,
    @ManyToOne
    @JoinColumn(name = "reserva_codigo")
    val reserva: Reserva,
    @OneToOne
    @JoinColumn(name = "estado_old")
    val estadoAntigo: EstadoReserva?,
    @OneToOne
    @JoinColumn(name = "estado_new")
    val estadoNovo: EstadoReserva
)