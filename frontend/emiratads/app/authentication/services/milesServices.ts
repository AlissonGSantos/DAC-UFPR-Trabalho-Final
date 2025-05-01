import { Invoice } from "@/app/types/InvoiceTypes";
import axios from "axios";

const milesServices = {
    getMiles: async (clientId: string): Promise<Invoice> =>{
        const res = await axios.get<Invoice>(`http://localhost:8082/clientes/${clientId}/milhas`);
        const data = res.data;
        return data;
    }
}

export default milesServices;