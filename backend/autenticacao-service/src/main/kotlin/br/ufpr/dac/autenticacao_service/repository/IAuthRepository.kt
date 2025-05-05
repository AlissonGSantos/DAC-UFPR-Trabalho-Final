package br.ufpr.dac.autenticacao_service.repository

import br.ufpr.dac.autenticacao_service.domain.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import utils.dto.UsuarioRole

@Repository
interface IAuthRepository : MongoRepository<User, String> {

    @Query("{login: '?0'}")
    fun findItemByLogin(login : String) : User?

    @Query("{code: ?0, role: ?1}")
    fun findFuncionarioByCodigo(codigo: Long, role: String = UsuarioRole.FUNCIONARIO.role): User?
}