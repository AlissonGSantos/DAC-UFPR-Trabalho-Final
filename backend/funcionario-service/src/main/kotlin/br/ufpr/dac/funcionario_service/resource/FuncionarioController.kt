package br.ufpr.dac.funcionario_service.resource

import br.ufpr.dac.funcionario_service.domain.Funcionario
import br.ufpr.dac.funcionario_service.repository.IFuncionarioRepository

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/funcionarios")
class FuncionarioController(private val repository: IFuncionarioRepository) {

    @GetMapping
    fun getFuncionarios(): List<Funcionario> {
         return repository.findAll()
    }
}