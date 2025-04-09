package br.ufpr.dac.funcionario_service.repository

import br.ufpr.dac.funcionario_service.domain.Funcionario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IFuncionarioRepository : JpaRepository<Funcionario, Long> {
    fun findByAtivoTrue(): List<Funcionario>

    fun findByCodigoAndAtivoTrue(codigo: Long): Funcionario?
}