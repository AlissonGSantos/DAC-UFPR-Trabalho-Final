import axiosInstance from "@/app/services/axiosInstance";
import apiRoutes from "@/app/utils/apiRoutes";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { Flight } from "@/app/types/FlightTypes";
import axios from "axios";

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

const bookingService = {
  getBooking: async (id: string): Promise<Booking> => {
    try {
      const response = await axiosInstance.get<Booking>(
        `${apiRoutes.booking.booking(id)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao buscar dados da reserva"
        );
      }
      throw new Error("Erro ao buscar dados da reserva");
    }
  },

  createBooking: async (bookingData: ReservaInputDTO): Promise<Booking> => {
    try {
      const response = await axiosInstance.post<Booking>(
        `${apiRoutes.booking.bookings}`,
        bookingData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.erro || "Erro ao criar reserva");
      }
      throw new Error("Erro ao criar reserva");
    }
  },

  cancelBooking: async (id: string): Promise<BookingReturnDTO> => {
    try {
      const response = await axiosInstance.delete<BookingReturnDTO>(
        `${apiRoutes.booking.booking(id)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao cancelar reserva"
        );
      }
      throw new Error("Erro ao cancelar reserva");
    }
  },

  updateBookingStatus: async (
    id: string,
    estado: AlternaEstadoDTO
  ): Promise<Booking> => {
    try {
      const response = await axiosInstance.patch<Booking>(
        `${apiRoutes.booking.booking_status(id)}`,
        estado
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao atualizar estado da reserva"
        );
      }
      throw new Error("Erro ao atualizar estado da reserva");
    }
  },

  getBookingSeats: async (flightId: string): Promise<PoltronasOcupadasDTO> => {
    try {
      const response = await axiosInstance.get<PoltronasOcupadasDTO>(
        `${apiRoutes.booking.bookings_seats(flightId)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao buscar poltronas reservadas"
        );
      }
      throw new Error("Erro ao buscar poltronas reservadas");
    }
  },

  getClientBookings: async (clientId: string): Promise<Booking[]> => {
    try {
      const response = await axiosInstance.get<Booking[]>(
        `${apiRoutes.booking.booking_client(clientId)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao buscar reservas do cliente"
        );
      }
      throw new Error("Erro ao buscar reservas do cliente");
    }
  },

  checkInBooking: async (id: string): Promise<Booking> => {
    try {
      const estadoDTO: AlternaEstadoDTO = { estado: "CHECK-IN" };
      return await bookingService.updateBookingStatus(id, estadoDTO);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao realizar check-in"
        );
      }
      throw new Error("Erro ao realizar check-in");
    }
  },

  boardBooking: async (id: string): Promise<Booking> => {
    try {
      const estadoDTO: AlternaEstadoDTO = { estado: "EMBARCADA" };
      return await bookingService.updateBookingStatus(id, estadoDTO);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao embarcar passageiro"
        );
      }
      throw new Error("Erro ao embarcar passageiro");
    }
  },
};

export default bookingService;
