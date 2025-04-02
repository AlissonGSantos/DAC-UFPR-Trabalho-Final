package br.ufpr.dac.voo_service.repository

import br.ufpr.dac.voo_service.domain.Voo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface IVooRepository : JpaRepository<Voo, String>{
    fun findByAtivoTrue(): List<Voo>
}