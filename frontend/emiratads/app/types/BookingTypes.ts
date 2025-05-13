import { Flight } from "./FlightTypes";

export enum statusBookingEnum {
  CRIADA = "CRIADA",
  CHECK_IN = "CHECK-IN",
  CANCELADA = "CANCELADA",
  CANCELADA_VOO = "CANCELADA VOO",
  EMBARCADA = "EMBARCADA",
  REALIZADA = "REALIZADA",
  NAO_REALIZADA = "NÃO REALIZADA",
}

export interface Booking {
  codigo: string;
  data: string;
  valor: number;
  quantidade_milhas: number;
  poltronas_reservadas: number[];
  codigo_cliente: number;
  estado: statusBookingEnum;
  voo_codigo: Flight["codigo"];
  voo: Flight;
}
