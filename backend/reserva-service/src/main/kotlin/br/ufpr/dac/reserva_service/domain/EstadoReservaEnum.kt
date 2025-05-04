package br.ufpr.dac.reserva_service.domain

enum class EstadoReservaEnum(val codigo: Long) {
    CRIADA(1L),
    CHECK_IN(2L),
    CANCELADA(3L),
    CANCELADA_VOO(4L),
    EMBARCADA(5L),
    REALIZADA(6L),
    NAO_REALIZADA(7L)
}