package br.ufpr.dac.voo_service.domain

import jakarta.persistence.*
import java.time.ZonedDateTime

@Entity
@Table(name = "voo")
class Voo(
    @Id
    val codigo: String,
    val data: ZonedDateTime,

    val valor_passagem: Double,
    val quantidade_poltronas_total: Int,
    var quantidade_poltronas_ocupadas: Int,

    @ManyToOne
    @JoinColumn(name = "estado_codigo", referencedColumnName = "codigo")
    var estado: EstadoVoo?,

    @ManyToOne
    @JoinColumn(name = "aeroporto_origem", referencedColumnName = "codigo")
    val aeroporto_origem: Aeroporto,

    @ManyToOne
    @JoinColumn(name = "aeroporto_destino", referencedColumnName = "codigo")
    val aeroporto_destino: Aeroporto
)