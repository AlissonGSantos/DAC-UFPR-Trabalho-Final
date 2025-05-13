import { LoginRequest, UserAuth } from "@/app/types/AuthTypes";
import apiRoutes from "@/app/utils/apiRoutes";
import axiosInstance from "@/app/services/axiosInstance";
import { LogoutDTO } from "./authenticationServicesModel";

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
  logout: async (body: LogoutDTO): Promise<LogoutDTO> => {
    try {
      const res = await axiosInstance.post<LogoutDTO>(`${apiUrl}${apiRoutes.authentication.logout}`, body);
      return res.data;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },
};

export default loginServices;
