import apiRoutes from "@/app/utils/apiRoutes";
import { Aeroporto, Flight } from "../types/FlightTypes";
import axiosInstance from "./axiosInstance";
import {
  CreateFlightRequest,
  FlightsResponse,
  PatchFlightStateDTO,
} from "./flightServiceModels";
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

const flightServices = {
  getFlights: async (): Promise<Flight[]> => {
    const res = await axiosInstance.get<FlightsResponse>(
      `${apiUrl}${apiRoutes.flight.flights}`
    );
    const data = res.data.voos;
    return data;
  },

  getFlight: async (flightId: string): Promise<Flight> => {
    const res = await axiosInstance.get<Flight>(
      `${apiUrl}${apiRoutes.flight.flight(flightId)}`
    );
    const data = res.data;
    return data;
  },

  createFlight: async (data: CreateFlightRequest): Promise<Flight> => {
    const res = await axiosInstance.post<Flight>(
      `${apiUrl}${apiRoutes.flight.flights}`,
      data
    );
    const flight = res.data;
    return flight;
  },

  cancelFlight: async (flightId: string): Promise<Flight> => {
    const res = await axiosInstance.delete<Flight>(
      `${apiUrl}${apiRoutes.flight.flight(flightId)}`
    );
    const data = res.data;
    return data;
  },

  getAirports: async (): Promise<Aeroporto[]> => {
    const res = await axiosInstance.get<Aeroporto[]>(
      `${apiUrl}${apiRoutes.flight.airports}`
    );
    const data = res.data;
    return data;
  },

  patchFlightState: async (
    flightId: string,
    state: PatchFlightStateDTO
  ): Promise<Flight> => {
    const res = await axiosInstance.patch<Flight>(
      `${apiUrl}${apiRoutes.flight.flight_status(flightId)}`,
      state
    );
    const data = res.data;
    return data;
  },
};

export default flightServices;
