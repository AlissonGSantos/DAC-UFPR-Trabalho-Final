package br.ufpr.dac.cliente_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "endereco")
data class Endereco (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long = 0L,
    var cep: String,
    var uf: String,
    var cidade: String,
    var bairro: String,
    var rua: String,
    var numero: String,
    var complemento: String,
    val ativo: Boolean = true
)