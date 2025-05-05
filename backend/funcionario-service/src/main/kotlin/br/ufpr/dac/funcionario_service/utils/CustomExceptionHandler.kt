package br.ufpr.dac.funcionario_service.utils

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import utils.dto.DefaultErrorDTO
import utils.exceptions.ResourceNotFoundException

@RestControllerAdvice
class CustomExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun NotFoundException(e: ResourceNotFoundException): ResponseEntity<DefaultErrorDTO>{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(DefaultErrorDTO(message = e.message))
    }
}