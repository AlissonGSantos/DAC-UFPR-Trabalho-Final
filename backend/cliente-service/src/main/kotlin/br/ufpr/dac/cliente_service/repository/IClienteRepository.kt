package br.ufpr.dac.cliente_service.repository

import br.ufpr.dac.cliente_service.domain.Cliente
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IClienteRepository : JpaRepository<Cliente, Long> {

}