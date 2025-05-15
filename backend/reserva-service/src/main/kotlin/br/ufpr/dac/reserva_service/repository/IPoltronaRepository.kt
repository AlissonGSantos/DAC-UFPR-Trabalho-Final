package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.PoltronasReservadas
import br.ufpr.dac.reserva_service.domain.embeddable.PoltronasReservadasId
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository


@Repository
interface IPoltronaRepository : JpaRepository<PoltronasReservadas, PoltronasReservadasId> {

    @Query(
        """
       SELECT p 
       FROM PoltronasReservadas p 
       WHERE p.id.codigo_voo = :codigo_voo
       """
    )
    fun getPoltronasReservadas(@Param("codigo_voo") codigo_voo: String): List<PoltronasReservadas>

    @Modifying
    @Transactional
    @Query("delete from PoltronasReservadas p where p.codigo_reserva = :codigo_reserva")
    fun deletePoltronasCanceladas(@Param("codigo_reserva") codigo_reserva: String)
}