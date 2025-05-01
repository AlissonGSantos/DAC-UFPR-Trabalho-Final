package br.ufpr.dac.reserva_service.repository

import br.ufpr.dac.reserva_service.domain.ReservaConsulta
import br.ufpr.dac.reserva_service.domain.embeddable.ReservaConsultaId
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.ZonedDateTime

@Repository
interface IConsultaRepository : JpaRepository<ReservaConsulta, ReservaConsultaId> {

    @Query(
        value =
            """
        SELECT 
            r.codigo,
            r.codigo_voo,
            r.codigo_cliente,
            r.estado,
            r.data,
            ARRAY_AGG(r.poltrona) AS poltronas,
            r.quantidade_milhas
        FROM emiratads_reserva_access.reserva r
        GROUP BY r.codigo, r.codigo_voo, r.codigo_cliente, r.estado, r.data, r.quantidade_milhas
        """, nativeQuery = true
    )
    fun findReservas(): List<ReservaConsulta>

    @Query(
        value =
            """
        SELECT 
            r.codigo,
            r.codigo_voo,
            r.codigo_cliente,
            r.estado,
            r.data,
            ARRAY_AGG(r.poltrona) AS poltronas,
            r.quantidade_milhas
        FROM emiratads_reserva_access.reserva r
        WHERE r.codigo_cliente = :codigo_cliente
        GROUP BY r.codigo, r.codigo_voo, r.codigo_cliente, r.estado, r.data, r.quantidade_milhas
        """, nativeQuery = true
    )
    fun findReservasByCodigoCliente(@Param("codigo_cliente") codigo_cliente: Long): List<ReservaConsulta>

    @Query(
        """
        SELECT 
            r.codigo,
            r.codigo_voo,
            r.codigo_cliente,
            r.estado,
            r.data,
            ARRAY_AGG(r.poltrona) AS poltronas,
            r.quantidade_milhas
        FROM emiratads_reserva_access.reserva r
        WHERE r.codigo = :codigo
        GROUP BY r.codigo, r.codigo_cliente, r.codigo_voo, r.estado, r.data, r.quantidade_milhas
        """, nativeQuery = true
    )
    fun findReservaByCodigo(@Param("codigo") codigo: String): ReservaConsulta?

    @Transactional
    @Modifying
    @Query(
        """
        INSERT INTO 
            emiratads_reserva_access.reserva 
            (codigo, codigo_cliente, codigo_voo, estado, data, poltrona, quantidade_milhas) 
        VALUES
            (:codigo, :codigo_cliente, :codigo_voo, :estado, :data, :poltrona, :quantidade_milhas);
        """, nativeQuery = true
    )
    fun save(
        @Param("codigo") codigo: String,
        @Param("codigo_cliente") codigo_cliente: Long,
        @Param("codigo_voo") codigo_voo: String,
        @Param("estado") estado: String,
        @Param("data") data: ZonedDateTime,
        @Param("poltrona") poltrona: Int,
        @Param("quantidade_milhas") quantidade_milhas: Double
    )

    @Transactional
    @Modifying
    @Query(
        """
            UPDATE emiratads_reserva_access.reserva
            SET estado = :estado, data = :data
            WHERE codigo = :codigo
        """, nativeQuery = true
    )
    fun update(@Param("estado") estado: String, @Param("data") data: ZonedDateTime, @Param("codigo") codigo: String)
}