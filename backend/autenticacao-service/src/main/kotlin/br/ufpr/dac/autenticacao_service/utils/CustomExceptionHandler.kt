package br.ufpr.dac.autenticacao_service.utils

import br.ufpr.dac.autenticacao_service.utils.exception.IncorrectPasswordException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import utils.dto.DefaultErrorDTO
import utils.exceptions.ResourceNotFoundException

@RestControllerAdvice
class CustomExceptionHandler {

    @ExceptionHandler(IncorrectPasswordException::class, ResourceNotFoundException::class)
    fun handleFailedLoginAttempts(e: Throwable): ResponseEntity<DefaultErrorDTO>{
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DefaultErrorDTO(message = e.message))
    }

}