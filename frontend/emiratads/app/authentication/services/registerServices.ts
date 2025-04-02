/* URL: viacep.com.br/ws/01001000/json/
 */

import { CEPResponse } from "@/app/types/AuthTypes";

const registerServices = {
    getCep: async (cep: string): Promise<CEPResponse> =>{
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        return data;
    }
    //TODO: IMPLEMENT OTHER SERVICES
}

export default registerServices;