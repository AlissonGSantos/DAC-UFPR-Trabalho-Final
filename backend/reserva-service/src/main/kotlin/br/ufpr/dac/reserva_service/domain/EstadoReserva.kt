package br.ufpr.dac.reserva_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "estado_reserva", schema = "emiratads_reserva_transaction")
data class EstadoReserva (
    @Id
    val codigo: Long,
    val sigla: String,
    val descricao: String
)