import { Flight } from "./FlightTypes";

export interface Booking {
  codigo: string;
  data: string;
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: number;
  estado: string;
  voo: Flight;
}
