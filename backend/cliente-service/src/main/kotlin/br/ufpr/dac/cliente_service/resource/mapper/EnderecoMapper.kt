package br.ufpr.dac.cliente_service.resource.mapper

import br.ufpr.dac.cliente_service.domain.Endereco
import utils.dto.EnderecoDTO

class EnderecoMapper {
    companion object {
        fun toDTO(endereco: Endereco): EnderecoDTO {
            return EnderecoDTO( endereco.cep, endereco.uf, endereco.cidade,
                endereco.bairro, endereco.rua, endereco.numero, endereco.complemento )
        }

        fun toDomain(endereco: EnderecoDTO): Endereco {
            return Endereco( 0L, endereco.cep, endereco.uf, endereco.cidade,
                endereco.bairro, endereco.rua, endereco.numero, endereco.complemento )
        }
    }
}