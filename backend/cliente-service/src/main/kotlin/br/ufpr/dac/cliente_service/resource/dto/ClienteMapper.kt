package br.ufpr.dac.cliente_service.resource.dto

import br.ufpr.dac.cliente_service.domain.Cliente
import utils.dto.ClienteOutputDTO

class ClienteMapper {
    companion object{
        fun toDTO(cliente: Cliente): ClienteOutputDTO {
            return ClienteOutputDTO(
                cliente.codigo,
                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.saldo_milhas,
                EnderecoMapper.toDTO(cliente.endereco)
            )
        }

        fun toDomain(cliente: ClienteOutputDTO): Cliente {
            return Cliente(
                cliente.codigo,
                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.saldo_milhas,
                EnderecoMapper.toDomain(cliente.endereco)
            )
        }
    }
}