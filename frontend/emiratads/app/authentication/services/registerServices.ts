/* URL: viacep.com.br/ws/01001000/json/
 */

import { CEPResponse } from "@/app/types/AuthTypes";
import axios from "axios";
import { RegisterFormData } from "../register/schema/schema";

const registerServices = {
    getCep: async (cep: string): Promise<CEPResponse> =>{

        const res = await axios.get<CEPResponse>(`https://viacep.com.br/ws/${cep}/json/`);
        return res.data
    },
    registerUser: async (data: RegisterFormData) => {
        const res = await axios.post<RegisterFormData>(`http://localhost:8080/clientes`, data);
        return res.data;
    }
}

export default registerServices;