package br.ufpr.dac.cliente_service.resource.mapper

import br.ufpr.dac.cliente_service.domain.Cliente
import utils.dto.ClienteInputDTO
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

        fun toDomain(cliente: ClienteInputDTO): Cliente {
            return Cliente(
                cliente.codigo ?: 0L,
                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.saldo_milhas,
                EnderecoMapper.toDomain(cliente.endereco),
                true
            )
        }
    }
}