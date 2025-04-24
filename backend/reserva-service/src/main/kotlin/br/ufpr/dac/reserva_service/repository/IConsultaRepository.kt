package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.ReservaConsulta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface IConsultaRepository : JpaRepository<ReservaConsulta, String> {

    @Query(
        """
    SELECT r.codigo AS codigo,
           r.codigo_cliente AS codigoCliente,
           r.codigo_voo AS codigoVoo,
           r.estado AS estado,
           r.data AS data,
           ARRAY_AGG(r.poltrona) AS poltronas,
           r.quantidade_milhas AS quantidadeMilhas
    FROM emiratads_reserva_access.reserva r
    GROUP BY r.codigo, r.codigo_cliente, r.codigo_voo, r.estado, r.data, r.quantidade_milhas
    """
    )
    fun findReservas(): List<ReservaConsulta>
}