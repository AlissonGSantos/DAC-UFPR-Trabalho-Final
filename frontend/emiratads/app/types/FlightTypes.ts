export enum statusFlightEnum {
    CONFIRMADO = 'CONFIRMADO',
    CANCELADO = 'CANCELADO',
    REALIZADO = 'REALIZADO'
}

export interface Aeroporto {
    codigo: string;
    nome: string;
    cidade: string;
    uf: string;
}

export interface Flight {
    codigo: string;
    data: string;
    valor_passagem: number;
    quantidade_poltronas_total: number;
    quantidade_poltronas_ocupadas: number;
    poltronas_ocupadas: number[];
    estado: statusFlightEnum;
    aeroporto_origem: Aeroporto;
    aeroporto_destino: Aeroporto;
}

export interface FlightUpdateResponse {
    codigo: string;
    data: string; 
    valor_passagem: number;
    quantidade_poltronas_total: number;
    quantidade_poltronas_ocupadas: number;
    estado: statusFlightEnum;
    codigo_aeroporto_origem: string;
    codigo_aeroporto_destino: string;
  }