/* URL: viacep.com.br/ws/01001000/json/
 */

import { CEPResponse } from "@/app/types/AuthTypes";
import axios from "axios";
import { RegisterFormData } from "../register/schema/schema";

const registerServices = {
    getCep: async (cep: string): Promise<CEPResponse> => {

        const res = await axios.get<CEPResponse>(`https://viacep.com.br/ws/${cep}/json/`);
        return res.data
    },
    registerUser: async (data: RegisterFormData) => {
        try {
            const res = await axios.post<RegisterFormData>(`http://localhost:8080/clientes`, data);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Erro ao registrar usuário");
            }
            throw new Error("Erro ao registrar usuário");
        }
    }
}

export default registerServices;