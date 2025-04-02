package br.ufpr.dac.autenticacao_service.utils

import org.springframework.stereotype.Service
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.security.SecureRandom
import java.util.*

@Service
class PasswordService {

    fun generateSalt(): String {
        val random = SecureRandom()
        val salt = ByteArray(16)
        random.nextBytes(salt)
        return Base64.getEncoder().encodeToString(salt)
    }

    @Throws(NoSuchAlgorithmException::class)
    fun hashPassword(password: String, salt: String): String {
        val md = MessageDigest.getInstance("SHA-256")
        md.update(salt.toByteArray())
        val hashedPassword = md.digest(password.toByteArray())
        return Base64.getEncoder().encodeToString(hashedPassword)
    }

    @Throws(NoSuchAlgorithmException::class)
    fun verifyPassword(password: String, salt: String, hashedPassword: String): Boolean {
        val hashedInputPassword: String = hashPassword(password, salt)
        return hashedInputPassword == hashedPassword
    }

}