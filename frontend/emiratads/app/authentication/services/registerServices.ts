import { CEPResponse } from "@/app/types/AuthTypes";
import { RegisterFormData } from "../register/schema/schema";
import apiRoutes from "@/app/utils/apiRoutes";
import axiosInstance from "@/app/services/axiosInstance";
import axios from "axios";

const registerServices = {
  getCep: async (cep: string): Promise<CEPResponse> => {
    const res = await axiosInstance.get<CEPResponse>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    return res.data;
  },
  registerUser: async (data: RegisterFormData) => {
    try {
      const res = await axiosInstance.post<RegisterFormData>(
        `${apiRoutes.authentication.register}`,
        data
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message ?? "Erro ao registrar usuário"
        );
      }
      throw new Error("Erro ao registrar usuário");
    }
  },
};

export default registerServices;
