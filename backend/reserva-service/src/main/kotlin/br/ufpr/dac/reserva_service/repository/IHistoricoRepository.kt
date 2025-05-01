package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.HistoricoReserva
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IHistoricoRepository : JpaRepository<HistoricoReserva, Long>{}