/* URL: viacep.com.br/ws/01001000/json/
 */

import { CEPResponse } from "@/app/types/AuthTypes";
import axios from "axios";

const registerServices = {
    getCep: async (cep: string): Promise<CEPResponse> =>{

        const res = await axios.get<CEPResponse>(`https://viacep.com.br/ws/${cep}/json/`);
        const data = res.data;
        return data;
    }
    //TODO: IMPLEMENT OTHER SERVICES
}

export default registerServices;