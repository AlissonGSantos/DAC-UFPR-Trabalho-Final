package br.ufpr.dac.saga_orchestration_service.utils

import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import utils.dto.DefaultErrorDTO
import utils.exceptions.ResourcesConflictException
import java.lang.IllegalArgumentException

@RestControllerAdvice
class CustomExceptionHandler {

    @ExceptionHandler(ResourcesConflictException::class)
    fun conflitoDeRecursos(exception: ResourcesConflictException): ResponseEntity<DefaultErrorDTO> {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(DefaultErrorDTO(message = exception.message))
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun parametrosInvalidos(exception: ConstraintViolationException): ResponseEntity<DefaultErrorDTO> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DefaultErrorDTO(message = exception.message))
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun parametrosInvalidos2(exception: IllegalArgumentException): ResponseEntity<DefaultErrorDTO> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DefaultErrorDTO(message = exception.message))
    }
}