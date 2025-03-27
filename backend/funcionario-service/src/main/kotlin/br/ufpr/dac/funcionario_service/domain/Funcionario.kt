package br.ufpr.dac.funcionario_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "funcionario")
class Funcionario(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long = 0L,

    val cpf: String,
    var nome: String,
    var email: String,
    var telefone: String
    var ativo: String
)