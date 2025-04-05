import axios from "axios";
import { LoginRequest, UserAuth } from "@/app/types/AuthTypes";
import apiRoutes from "@/app/utils/apiRoutes";

const loginServices = {
  login: async (loginParameters: LoginRequest): Promise<UserAuth> => {
    try {
      console.log("Login parameters:", loginParameters);
      const res = await axios.post(
        `http://localhost:8081/v1${apiRoutes.authentication.login}`,
        loginParameters,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", res.data);
      return res.data as UserAuth;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },
};

export default loginServices;