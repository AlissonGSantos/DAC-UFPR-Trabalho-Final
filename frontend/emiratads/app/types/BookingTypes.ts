import { Flight } from "./FlightTypes";

export enum statusBookingEnum {
    CRIADA = 'CRIADA',
    CHECK_IN = 'CHECK-IN',
    CANCELADA = 'CANCELADA',
    CANCELADA_VOO = 'CANCELADO VOO',
    EMBARCADA = 'EMBARCADA',
    REALIZADA = 'REALIZADA',
    NÃO_REALIZADA = 'NÃO REALIZADA'
}

export interface Booking {
    codigo: string;
    data: string;
    valor: number;
    milhas_utilizadas: number;
    quantidade_poltronas: number;
    codigo_cliente: number;
    estado: statusBookingEnum;
    voo: Flight;
  }