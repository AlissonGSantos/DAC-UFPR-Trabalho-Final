package br.ufpr.dac.voo_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table (name = "estado_voo")
class EstadoVoo (
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val codigo: Long,

    val sigla: String,
    val descricao: String
)