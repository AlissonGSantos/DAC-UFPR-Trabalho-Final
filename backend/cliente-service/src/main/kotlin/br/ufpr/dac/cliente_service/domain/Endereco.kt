package br.ufpr.dac.cliente_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "endereco")
data class Endereco (
    @Id val codigo: Long,
    var cep: String,
    var uf: String,
    var cidade: String,
    var bairro: String,
    var rua: String,
    var numero: String,
    var complemento: String
)