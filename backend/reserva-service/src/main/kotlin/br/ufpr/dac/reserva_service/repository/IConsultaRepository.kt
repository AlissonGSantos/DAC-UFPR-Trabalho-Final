package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.ReservaConsulta
import br.ufpr.dac.reserva_service.domain.embeddable.ReservaConsultaId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface IConsultaRepository : JpaRepository<ReservaConsulta, ReservaConsultaId> {

    @Query("SELECT r FROM ReservaConsulta r WHERE r.codigo = :codigo")
    fun findByCodigo(@Param("codigo") codigo: String): ReservaConsulta?

    /*@Query(
        """
        SELECT 
            r.codigo AS id_codigo,
            r.codigo_voo AS id_codigo_voo,
            r.codigo_cliente AS codigo_cliente,
            r.estado AS estado,
            r.data AS data,
            ARRAY_AGG(r.poltrona) AS poltronas,
            r.quantidade_milhas AS quantidade_milhas
        FROM emiratads_reserva_access.reserva r
        GROUP BY r.codigo, r.codigo_voo, r.codigo_cliente, r.estado, r.data, r.quantidade_milhas
        """
    )
    fun findReservas(): List<ReservaConsulta>

    @Query(
        """
        SELECT 
            r.codigo AS id_codigo,
            r.codigo_voo AS id_codigo_voo,
            r.codigo_cliente AS codigo_cliente,
            r.estado AS estado,
            r.data AS data,
            ARRAY_AGG(r.poltrona) AS poltronas,
            r.quantidade_milhas AS quantidade_milhas
        FROM emiratads_reserva_access.reserva r
        WHERE r.codigo = :codigo
        GROUP BY r.codigo, r.codigo_cliente, r.codigo_voo, r.estado, r.data, r.quantidade_milhas
        """
    )
    fun findReservaByCodigo(@Param("codigo") codigo: String): ReservaConsulta?*/
}