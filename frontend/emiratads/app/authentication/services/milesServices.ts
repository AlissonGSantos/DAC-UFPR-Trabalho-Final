import { Invoice } from "@/app/types/InvoiceTypes";
import { Client } from "@/app/types/AuthTypes";
import axios from "axios";
import apiRoutes from "@/app/utils/apiRoutes";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
const milesServices = {

    getMiles: async (clientId: string): Promise<Invoice> =>{
        const res = await axios.get<Invoice>(`${apiUrl}${apiRoutes.miles.miles(clientId)}`);
        const data = res.data;
        return data;
    },
    
    buyMiles: async (clientId: string, data: { quantidade: number }): Promise<Client> => {
        const res = await axios.put<Client>(`http://localhost:8082/clientes/${clientId}/milhas`, data);
        const client = res.data;
        return client;
    }
}

export default milesServices;