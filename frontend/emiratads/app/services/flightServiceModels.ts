import { Flight } from "../types/FlightTypes";

export interface FlightsResponse {
  voos: Flight[];
}

export interface CreateFlightRequest {
  data: string;
  valor_passagem: number;
  quantidade_poltronas_total: number;
  codigo_aeroporto_origem: Flight["aeroporto_origem"]["codigo"];
  codigo_aeroporto_destino: Flight["aeroporto_destino"]["codigo"];
}

export interface PatchFlightStateDTO {
  estado: Flight["estado"];
}
