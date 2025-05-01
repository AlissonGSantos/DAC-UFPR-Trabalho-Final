package br.ufpr.dac.voo_service.repository

import br.ufpr.dac.voo_service.domain.EstadoVoo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IEstadoVooRepository : JpaRepository<EstadoVoo, Long> {}