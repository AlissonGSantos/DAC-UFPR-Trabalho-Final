export enum EmployeeEnum {
    FUNCIONARIO = 'FUNCIONARIO',
    CLIENTE = 'CLIENTE'
}

export type UserAuth = {
    access_token: string,
    token_type: string,
    tipo: EmployeeEnum
    usuario: {
        codigo: string,
        cpf: string,
        email: string,
        nome: string,
        saldo_milhas: number,
        endereco: {
        cep: string,
        uf: string,
        cidade: string,
        bairro: string,
        rua: string,
        numero: string,
        complemento: string
        }
      }
}

export interface LoginRequest{
    email: string,
    password: string
}

export interface LogoutRequest{
    login: string
}

export interface RegisterRequest{
    cpf: string,
    email: string,
    nome: string,
    endereco: {
        cep: string,
        uf: string,
        cidade: string,
        bairro: string,
        rua: string,
        numero: string,
        complemento: string
    }
}

export interface CEPResponse{
    cep: string,
    logradouro: string,
    complemento: string,
    unidade: string,
    bairro: string,
    localidade: string,
    uf: string,
    estado: string,
    regiao: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}
