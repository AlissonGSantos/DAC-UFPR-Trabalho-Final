package br.ufpr.dac.voo_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "aeroporto")
class Aeroporto(
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: String,

    val nome: String,
    val cidade: String,
    val uf: String,
    val ativo: Boolean
)