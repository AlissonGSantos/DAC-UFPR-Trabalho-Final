package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.EstadoReserva
import org.springframework.data.jpa.repository.JpaRepository

interface IEstadoReservaRepository : JpaRepository<EstadoReserva, Long> {}