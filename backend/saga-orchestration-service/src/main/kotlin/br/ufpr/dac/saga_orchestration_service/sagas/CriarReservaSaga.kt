package br.ufpr.dac.saga_orchestration_service.sagas

import br.ufpr.dac.saga_orchestration_service.utils.RabbitUtils
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.*
import org.springframework.amqp.core.DirectExchange
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import utils.gson.GsonProcessor
import utils.dto.*
import utils.gson.ZonedDateTimeAdapter
import java.time.ZonedDateTime
import kotlin.reflect.jvm.internal.impl.load.java.lazy.descriptors.DeclaredMemberIndex

@Service
class CriarReservaSaga(
    private val rabbit: RabbitUtils,
    @Qualifier("sagaCriarReserva") val exchangeCriar: DirectExchange,
    @Qualifier("sagaCancelarReserva") val exchangeCancelar: DirectExchange
) {
    private final val gson: Gson = GsonBuilder()
        .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
        .create()

    suspend fun executeSaga(payload: ReservaInputDTO): ReservaOutputDTO = coroutineScope {
        // Verificar se o cliente tem milhas suficientes
        val requestConsultaSaldo =
            async { rabbit.asyncSendAndReceive(exchangeCriar.name, "saldo", gson.toJson(payload)) }
        val responseConsultaSaldo = requestConsultaSaldo.await()
        GsonProcessor.parseJson<ClienteOutputDTO>(responseConsultaSaldo)

        // Verifica os assentos disponíveis no voo e marca como ocupados (retorna dados do voo)
        val checkVooRequest = async { rabbit.asyncSendAndReceive(exchangeCriar.name, "voo", gson.toJson(payload)) }
        val vooPayload = checkVooRequest.await()

        val dadosVoo = GsonProcessor.parseJson<VooOutputDTO>(vooPayload)

        // Registra a reserva
        val reservaTransaction = ReservaTransactionDTO(
            payload.valor,
            payload.milhas_utilizadas,
            payload.quantidade_poltronas,
            payload.poltronas_reservadas,
            payload.codigo_cliente,
            dadosVoo
        )

        val efetuaReserva =
            async { rabbit.asyncSendAndReceive(exchangeCriar.name, "reserva", gson.toJson(reservaTransaction)) }
        val reservaResponse = efetuaReserva.await()

        // Se deu erro na criação da reserva, libera os assentos do voo
        val dadosReserva = GsonProcessor.parseJson<ReservaCreationResponseDTO>(reservaResponse
        ) { rollbackVoo(dadosVoo.codigo, payload.quantidade_poltronas) }

        // Desconta as milhas do cliente (já enviar no formato de Transaction)
        val saveTransactionRequest =
            async { rabbit.asyncSendAndReceive(exchangeCriar.name, "cliente", gson.toJson(dadosReserva)) }
        val savedTransaction = saveTransactionRequest.await()

        val transaction = GsonProcessor.parseJson<ExtratoDTO>(savedTransaction)

        processResults(dadosReserva, dadosVoo, transaction)
    }

    fun rollbackVoo(codigo_voo: String, poltronas: Int) {
        val reserva = ReservaOutputDTO( "", ZonedDateTime.now(), "",
            0f, 0, null,
            (1..poltronas).toList(), null, codigo_voo
        )
        rabbit.asyncSend(exchangeCancelar.name, "voo", gson.toJson(reserva))
    }

    private fun processResults(
        dadosReserva: ReservaCreationResponseDTO,
        dadosVoo: VooOutputDTO,
        transaction: ExtratoDTO
    ): ReservaOutputDTO {
        return ReservaOutputDTO(
            dadosReserva.codigo_reserva,
            dadosReserva.data,
            dadosReserva.estado_reserva,
            transaction.transacoes[0].quantidade_milhas,
            transaction.codigo,
            transaction.saldo_milhas,
            dadosReserva.poltronas,
            dadosVoo
        )
    }
}