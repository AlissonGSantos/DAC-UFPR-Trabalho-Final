package br.ufpr.dac.funcionario_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "funcionario")
data class Funcionario (
    @Id val codigo: Long,
    val cpf: String,
    var nome: String,
    var email: String,
    var telefone: String
)