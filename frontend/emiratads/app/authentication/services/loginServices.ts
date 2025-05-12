import axios from "axios";
import { LoginRequest, UserAuth } from "@/app/types/AuthTypes";
import apiRoutes from "@/app/utils/apiRoutes";
import axiosInstance from "@/app/services/axiosInstance";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

const loginServices = {
  login: async (loginParameters: LoginRequest): Promise<UserAuth> => {
    try {
      const res = await axiosInstance.post(
        `${apiUrl}${apiRoutes.authentication.login}`,
        loginParameters
      );

      return res.data as UserAuth;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },
};

export default loginServices;
