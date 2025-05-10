package br.ufpr.dac.cliente_service.repository

import br.ufpr.dac.cliente_service.domain.Cliente
import br.ufpr.dac.cliente_service.domain.Transacao
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ITransacaoRepository : JpaRepository<Transacao, Long> {
    fun findByCliente(cliente: Cliente): List<Transacao>
}