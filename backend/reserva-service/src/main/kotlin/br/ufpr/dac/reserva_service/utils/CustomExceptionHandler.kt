package br.ufpr.dac.reserva_service.utils

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import utils.dto.DefaultErrorDTO
import utils.exceptions.ResourceNotFoundException
import java.lang.IllegalArgumentException

@RestControllerAdvice
class CustomExceptionHandler {

    @ExceptionHandler(IllegalArgumentException::class)
    fun parametrosInvalidos2(exception: IllegalArgumentException): ResponseEntity<DefaultErrorDTO> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DefaultErrorDTO(message = exception.message))
    }

    @ExceptionHandler(ResourceNotFoundException::class)
    fun NotFoundException(e: ResourceNotFoundException): ResponseEntity<DefaultErrorDTO>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(DefaultErrorDTO(message = e.message))
    }
}