import { statusBookingEnum } from "@/app/types/BookingTypes";
import { Flight } from "@/app/types/FlightTypes";

export interface ReservaInputDTO {
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  poltronas_reservadas?: number[];
  codigo_cliente: number;
  codigo_voo: string;
}

export interface AlternaEstadoDTO {
  estado: string;
}

export interface PoltronasOcupadasDTO {
  poltronasReservadas: number[];
}

export interface BookingReturnDTO {
  codigo: string;
  data: string;
  estado: statusBookingEnum;
  quantidade_milhas: number;
  codigo_cliente: number;
  saldo_cliente: number;
  poltronas_reservadas: number[];
  voo: Flight;
}
