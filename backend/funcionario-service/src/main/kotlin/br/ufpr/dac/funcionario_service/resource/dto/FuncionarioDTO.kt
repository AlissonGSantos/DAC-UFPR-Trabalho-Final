package br.ufpr.dac.funcionario_service.resource.dto

import br.ufpr.dac.funcionario_service.domain.Funcionario

import jakarta.validation.constraints.*
import org.hibernate.validator.constraints.br.CPF

data class FuncionarioDTO(
    val codigo: Long,

    @NotBlank
    val nome: String,

    @CPF
    val cpf: String,

    @NotBlank
    @Email
    val email: String,

    @NotBlank
    @Pattern(regexp = "\\d{10,11}", message = "O telefone deve ter entre 10 e 11 dígitos")
    val telefone: String
) {
    fun toFuncionario(): Funcionario {
        return Funcionario(cpf = cpf, nome = nome, email = email, telefone = telefone, ativo = true)
    }
}
