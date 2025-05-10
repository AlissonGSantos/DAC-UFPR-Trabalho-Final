package br.ufpr.dac.autenticacao_service.utils

import jakarta.mail.MessagingException
import jakarta.mail.internet.MimeMessage
import org.springframework.core.io.ClassPathResource
import org.springframework.mail.MailException
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import java.io.IOException
import java.nio.charset.StandardCharsets
import org.springframework.core.io.FileSystemResource
import java.io.File

@Service
class EmailService(private val mailSender: JavaMailSender) {

    @Throws(IOException::class)
    fun emailBody(senha: String): String {
        val resource = ClassPathResource("static/templateEmail.html")
        val htmlContent = String(resource.inputStream.readAllBytes(), StandardCharsets.UTF_8)

        return htmlContent.replace("{{senha}}", senha)
    }

    fun sendEmail(destiny: String, senha: String) {
        try {
            val mimeMessage: MimeMessage = mailSender.createMimeMessage()
            val helper = MimeMessageHelper(mimeMessage, true, "UTF-8")

            helper.setFrom("emiratadsairlines.noreply@gmail.com")
            helper.setTo(destiny)
            helper.setSubject("Novo usuário e senha gerados!")
            helper.setText(emailBody(senha), true)

            // Adiciona a imagem como anexo e referência no HTML
            val logoFile = ClassPathResource("static/emiratadsLogo.png")
            helper.addInline("emiratadsLogo", logoFile)

            mailSender.send(mimeMessage)
        } catch (ex: MailException) {
            println(("Erro no envio do email!" + ex.message))
        } catch (ex: IOException) {
            println(("Erro no envio do email!" + ex.message))
        } catch (e: MessagingException) {
            throw RuntimeException(e)
        }
    }
}