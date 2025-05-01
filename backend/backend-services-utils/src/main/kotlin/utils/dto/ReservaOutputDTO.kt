package utils.dto

import com.fasterxml.jackson.annotation.JsonInclude
import java.time.ZonedDateTime

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ReservaOutputDTO(
    val codigo: String,
    val data: ZonedDateTime,
    val estado: String,
    val quantidade_milhas: Float,
    val codigo_cliente: Long,
    val saldo_cliente: Float? = null,
    val poltronas_reservadas: List<Int>,
    val voo: VooOutputDTO?,
    val voo_codigo: String? = null
)