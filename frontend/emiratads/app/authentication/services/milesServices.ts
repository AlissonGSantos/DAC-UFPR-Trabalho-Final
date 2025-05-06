import { Invoice } from "@/app/types/InvoiceTypes";
import { Client } from "@/app/types/AuthTypes";
import axios from "axios";

const milesServices = {
    getMiles: async (clientId: string): Promise<Invoice> =>{
        const res = await axios.get<Invoice>(`http://localhost:8082/clientes/${clientId}/milhas`);
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