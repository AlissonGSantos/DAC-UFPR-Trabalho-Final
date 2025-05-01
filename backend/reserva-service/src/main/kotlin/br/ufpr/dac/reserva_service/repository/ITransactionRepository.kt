package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.Reserva
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ITransactionRepository : JpaRepository<Reserva, String> {
    @Query("SELECT r FROM Reserva r WHERE r.codigo_voo = ?1")
    fun findByCodigoVoo(codigo_voo: String): List<Reserva>
}