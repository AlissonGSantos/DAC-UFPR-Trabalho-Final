import axiosInstance from "@/app/services/axiosInstance";
import apiRoutes from "@/app/utils/apiRoutes";
import { Booking } from "@/app/types/BookingTypes";
import axios from "axios";
import { ReservaInputDTO, BookingReturnDTO, AlternaEstadoDTO, PoltronasOcupadasDTO } from "./bookingServiceModel";

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
          error.response?.data?.erro ?? "Erro ao buscar dados da reserva"
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
        throw new Error(error.response?.data?.erro ?? "Erro ao criar reserva");
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
          error.response?.data?.erro ?? "Erro ao cancelar reserva"
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
          error.response?.data?.erro ?? "Erro ao atualizar estado da reserva"
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
          error.response?.data?.erro ?? "Erro ao buscar poltronas reservadas"
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
          error.response?.data?.erro ?? "Erro ao buscar reservas do cliente"
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
          error.response?.data?.erro ?? "Erro ao realizar check-in"
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
          error.response?.data?.erro ?? "Erro ao embarcar passageiro"
        );
      }
      throw new Error("Erro ao embarcar passageiro");
    }
  },
};

export default bookingService;
