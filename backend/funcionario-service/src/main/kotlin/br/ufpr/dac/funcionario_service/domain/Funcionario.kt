package br.ufpr.dac.funcionario_service.domain

import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioInputDTO
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

@Entity
@Table(name = "funcionario")
class Funcionario(
    @Id
    var codigo: Long? = null,

    @field:NotBlank(message = "O CPF é obrigatório")
    @field:Pattern(regexp = "\\d{11}", message = "O CPF deve conter 11 dígitos")
    var cpf: String,

    @field:NotBlank(message = "O nome é obrigatório")
    @field:Size(max = 100, message = "O nome pode ter no máximo 100 caracteres")
    var nome: String,

    @field:NotBlank(message = "O email é obrigatório")
    @field:Pattern(regexp = ".+@.+\\..+", message = "O email deve ser válido")
    var email: String,

    @field:NotBlank(message = "O telefone é obrigatório")
    @field:Pattern(regexp = "\\d{10,11}", message = "O telefone deve ter entre 10 e 11 dígitos")
    var telefone: String
) {
    constructor(funcionario: FuncionarioInputDTO) : this (
        codigo = funcionario.codigo,
        nome = funcionario.nome,
        cpf = funcionario.cpf,
        email = funcionario.email,
        telefone = funcionario.telefone
    )
}