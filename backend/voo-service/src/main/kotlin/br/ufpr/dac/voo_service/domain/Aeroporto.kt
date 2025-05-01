package br.ufpr.dac.voo_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "aeroporto")
class Aeroporto(
    @Id
    val codigo: String,
    val nome: String,
    val cidade: String,
    val uf: String
)