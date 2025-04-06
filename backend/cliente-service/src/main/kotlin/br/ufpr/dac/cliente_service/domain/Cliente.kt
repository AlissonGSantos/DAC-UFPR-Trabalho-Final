package br.ufpr.dac.cliente_service.domain

import jakarta.persistence.*

@Entity
@Table(name = "cliente")
data class Cliente (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long = 0L,
    val cpf: String,
    var nome: String,
    var email: String,
    var saldo_milhas: Float,
    @OneToOne(cascade = [CascadeType.PERSIST])
    @JoinColumn(name = "endereco_codigo", nullable = false)
    var endereco: Endereco,
    var ativo: Boolean
)
