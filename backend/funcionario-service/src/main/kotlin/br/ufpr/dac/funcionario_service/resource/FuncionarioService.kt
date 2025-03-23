package br.ufpr.dac.funcionario_service.service

import br.ufpr.dac.funcionario_service.domain.Funcionario
import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioInputDTO
import br.ufpr.dac.funcionario_service.resource.dto.FuncionarioOutputDTO
import org.springframework.stereotype.Service

@Service
class FuncionarioService(private val repository: IFuncionarioRepository) {

    fun getAllFuncionarios(): List<FuncionarioOutputDTO> {
        return repository.findAll().map { FuncionarioOutputDTO(it) }
    }

    fun updateFuncionario(funcionarioDTO: FuncionarioInputDTO) {
        val funcionario = repository.findById(funcionarioDTO.codigo)
            .orElseThrow { IllegalArgumentException("Funcionário não encontrado com o ID: ${funcionarioDTO.codigo}") }

        funcionario.nome = funcionarioDTO.nome
        funcionario.email = funcionarioDTO.email
        funcionario.telefone = funcionarioDTO.telefone
        funcionario.cpf = funcionarioDTO.cpf

        repository.save(funcionario)
    }

    fun saveFuncionario(funcionario: Funcionario): Funcionario {
        // Validar CPF dentro do Serviço
        if (!validarCPF(funcionario.cpf)) {
            throw IllegalArgumentException("CPF inválido")
        }

        return repository.save(funcionario)
    }

    // Função de Validação do CPF
    private fun validarCPF(cpf: String): Boolean {
        // Remover caracteres não numéricos
        val cpfLimpo = cpf.replace(Regex("[^0-9]"), "")

        // Verificar se tem 11 dígitos
        if (cpfLimpo.length != 11) return false

        // Verificar CPF's inválidos conhecidos (como 111.111.111-11)
        if (cpfLimpo.all { it == cpfLimpo[0] }) return false

        // Validar o primeiro dígito verificador
        var soma = 0
        var peso = 10
        for (i in 0 until 9) {
            soma += cpfLimpo[i].toString().toInt() * peso--
        }
        var digito1 = 11 - (soma % 11)
        if (digito1 >= 10) digito1 = 0

        // Validar o segundo dígito verificador
        soma = 0
        peso = 11
        for (i in 0 until 10) {
            soma += cpfLimpo[i].toString().toInt() * peso--
        }
        var digito2 = 11 - (soma % 11)
        if (digito2 >= 10) digito2 = 0

        // Verificar se os dígitos verificadores são válidos
        return cpfLimpo[9].toString().toInt() == digito1 && cpfLimpo[10].toString().toInt() == digito2
    }
}
