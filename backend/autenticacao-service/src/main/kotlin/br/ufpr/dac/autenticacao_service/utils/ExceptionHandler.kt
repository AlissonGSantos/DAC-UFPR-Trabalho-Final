package br.ufpr.dac.autenticacao_service.utils

import br.ufpr.dac.autenticacao_service.utils.exception.IncorrectPasswordException
import br.ufpr.dac.autenticacao_service.utils.exception.UserNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ExceptionHandler {

    @ExceptionHandler(IncorrectPasswordException::class, UserNotFoundException::class)
    fun handleFailedLoginAttempts(e: Throwable): ResponseEntity<String>{
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.message)
    }

}