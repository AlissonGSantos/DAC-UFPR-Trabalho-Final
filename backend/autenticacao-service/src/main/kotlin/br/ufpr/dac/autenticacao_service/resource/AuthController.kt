package br.ufpr.dac.autenticacao_service.resource

import br.ufpr.dac.autenticacao_service.resource.dto.loginInputDTO
import br.ufpr.dac.autenticacao_service.resource.dto.loginOutputDTO
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/auth")
class AuthController (val authService: AuthService) {
    @PostMapping
    fun login(@RequestBody @Valid usuario: loginInputDTO): ResponseEntity<loginOutputDTO> {
        val auth = authService.login(usuario)
        return ResponseEntity.ok().body(auth)
    }

}