package br.ufpr.dac.funcionario_service.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

@Entity
@Table(name = "funcionario")
data class Funcionario(
    @Id
    val codigo: Long,

    @field:NotBlank(message = "O CPF é obrigatório")
    @field:Pattern(regexp = "\\d{11}", message = "O CPF deve conter 11 dígitos")
    val cpf: String,

    @field:NotBlank(message = "O nome é obrigatório")
    @field:Size(max = 100, message = "O nome pode ter no máximo 100 caracteres")
    var nome: String,

    @field:NotBlank(message = "O email é obrigatório")
    @field:Pattern(regexp = ".+@.+\\..+", message = "O email deve ser válido")
    var email: String,

    @field:NotBlank(message = "O telefone é obrigatório")
    @field:Pattern(regexp = "\\d{10,11}", message = "O telefone deve ter entre 10 e 11 dígitos")
    var telefone: String
)