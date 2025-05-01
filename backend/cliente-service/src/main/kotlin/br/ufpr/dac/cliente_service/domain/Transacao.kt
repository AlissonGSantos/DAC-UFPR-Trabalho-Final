package br.ufpr.dac.cliente_service.domain

import jakarta.persistence.*
import java.time.ZonedDateTime

@Entity
class Transacao (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long = 0L,

    @ManyToOne
    @JoinColumn(name = "cliente_codigo")
    val cliente: Cliente,
    val codigo_reserva: String?,
    val data: ZonedDateTime,
    val quantidade_milhas: Float,
    val valor: Double,
    val descricao: String,

    @Enumerated(EnumType.STRING)
    val tipo: TipoTransacao
)