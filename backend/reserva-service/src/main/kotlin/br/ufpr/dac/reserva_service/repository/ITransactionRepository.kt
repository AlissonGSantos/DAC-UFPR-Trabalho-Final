package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.Reserva
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ITransactionRepository : JpaRepository<Reserva, String> {
}