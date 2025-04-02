package br.ufpr.dac.autenticacao_service.repository

import br.ufpr.dac.autenticacao_service.domain.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface IAuthRepository : MongoRepository<User, String> {

    @Query("{login: '?0'}")
    fun findItemByLogin(login : String) : User?
}