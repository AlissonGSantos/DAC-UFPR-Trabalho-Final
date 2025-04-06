package br.ufpr.dac.cliente_service.repository

import br.ufpr.dac.cliente_service.domain.Endereco
import org.springframework.data.jpa.repository.JpaRepository

interface IEnderecoRepository : JpaRepository<Endereco, Long> {
}