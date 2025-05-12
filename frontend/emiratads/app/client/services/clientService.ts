import axios from "axios";
import apiRoutes from "@/app/utils/apiRoutes";
import { Booking } from "@/app/types/BookingTypes";
import axiosInstance from "@/app/services/axiosInstance";

interface ClienteOutputDTO {
  codigo: number;
  cpf: string;
  nome: string;
  email: string;
  saldo_milhas: number;
  endereco: {
    codigo?: number;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  };
}

const clientService = {
  getClient: async (id: string): Promise<ClienteOutputDTO> => {
    try {
      const response = await axiosInstance.get<ClienteOutputDTO>(
        `${apiRoutes.clients.client(id)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.erro || "Erro ao buscar dados do cliente"
        );
      }
      throw new Error("Erro ao buscar dados do cliente");
    }
  },

  getBookings: async (id: string): Promise<Booking[]> => {
    try {
      const response = await axiosInstance.get<Booking[]>(
        `${apiRoutes.clients.client_bookings(id)}`
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
};

export default clientService;
