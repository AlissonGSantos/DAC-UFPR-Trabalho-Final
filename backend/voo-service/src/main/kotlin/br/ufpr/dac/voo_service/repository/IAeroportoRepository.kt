package br.ufpr.dac.voo_service.repository

import br.ufpr.dac.voo_service.domain.Aeroporto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IAeroportoRepository : JpaRepository<Aeroporto, String>{

}