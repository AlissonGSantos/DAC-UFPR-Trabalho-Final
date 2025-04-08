package br.ufpr.dac.autenticacao_service.resource.dto

import br.ufpr.dac.autenticacao_service.domain.User
import utils.dto.UsuarioInputDTO

class UsuarioMapper {
    companion object{
        fun toDomain(usuario: UsuarioInputDTO): User {
            return User(usuario.email, usuario.codigo, usuario.senha!!, usuario.role)
        }
    }
}