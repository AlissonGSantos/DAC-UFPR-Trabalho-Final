package br.ufpr.dac.autenticacao_service.utils

import br.ufpr.dac.autenticacao_service.domain.User
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTCreationException
import com.auth0.jwt.exceptions.JWTVerificationException
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset

@Service
class TokenJWTService {

    @Value("\${api.security.token.secret}")
    lateinit var secret: String

    fun getToken(user: User): String {
        try {
            val algoritmo = Algorithm.HMAC256(secret)
            return JWT.create()
                .withIssuer("br.ufpr.dac.emiratads")
                .withSubject(user.code.toString())
                .withClaim("profile", user.role.toString())
                .withExpiresAt(expireDate())
                .sign(algoritmo)
        } catch (exception: JWTCreationException) {
            throw RuntimeException("erro ao gerar token jwt", exception)
        }
    }

    fun getProfile(token: String): String {
        try {
            val algoritmo = Algorithm.HMAC256(secret)
            return JWT.require(algoritmo)
                .withIssuer("br.ufpr.dac.emiratads")
                .build()
                .verify(token)
                .getClaim("profile").asString()
        } catch (exception: JWTVerificationException) {
            throw RuntimeException("Token JWT inválido ou expirado!")
        }
    }

    fun getUserId(token: String): Long {
        try {
            val algoritmo = Algorithm.HMAC256(secret)
            return JWT.require(algoritmo)
                .withIssuer("br.ufpr.dac.emiratads")
                .build()
                .verify(token)
                .subject.toLong()
        } catch (exception: JWTVerificationException) {
            throw RuntimeException("Token JWT inválido ou expirado!")
        }
    }

    private fun expireDate(): Instant = LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"))

}