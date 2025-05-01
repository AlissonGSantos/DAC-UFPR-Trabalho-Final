package br.ufpr.dac.voo_service.domain

enum class EstadoVooEnum(val codigo: Long) {
    CONFIMADO(1L),
    CANCELADO(2L),
    REALIZADO(3L)
}