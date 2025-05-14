package utils.gson

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import jakarta.validation.ConstraintViolationException
import utils.dto.RabbitMessageDTO
import utils.exceptions.*
import java.lang.IllegalArgumentException
import java.time.ZonedDateTime
import kotlin.jvm.Throws

class GsonProcessor {
    companion object {
        val gson: Gson = GsonBuilder()
            .registerTypeAdapter(ZonedDateTime::class.java, ZonedDateTimeAdapter())
            .create()
        val knownExceptions = mapOf(
            "ResourcesConflictException" to ResourcesConflictException::class.java,
            "ResourceNotFoundException" to ResourceNotFoundException::class.java,
            "ConstraintViolationException" to ConstraintViolationException::class.java,
            "IllegalArgumentException" to IllegalArgumentException::class.java
        )

        @Throws(
            ResourcesConflictException::class,
            ResourceNotFoundException::class,
            ConstraintViolationException::class
        )
        inline fun <reified T> parseJson(json: String, failover: () -> Unit = {}): T {
            val type = object : TypeToken<RabbitMessageDTO<T>>() {}.type
            val message: RabbitMessageDTO<T> = gson.fromJson(json, type)
            if (!message.success) {
                failover()
                message.exception?.let {
                    val exceptionClass =
                        knownExceptions[it] ?: throw ClassNotFoundException("Exceção desconhecida \\o/")
                    val constructor = exceptionClass.getConstructor(String::class.java)
                    throw constructor.newInstance(message.message)
                } ?: throw Exception(message.message)
            } else {
                return message.data ?: throw Exception("Data é null")
            }
        }
    }
}