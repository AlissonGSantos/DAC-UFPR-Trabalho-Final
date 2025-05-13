import { Employee } from "@/app/types/EmployeeTypes";
import axios from "axios";
import apiRoutes from "@/app/utils/apiRoutes";
import { maskCPF } from "@/app/utils/cpfMask";
import { phoneMask } from "@/app/utils/phoneMask";

const employeeServices = {
    getEmployee: async (employeeId: string): Promise<Employee> => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const res = await axios.get<Employee>(`${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.employees.employee(employeeId)}`, {
            headers: {
                Authorization: `Authorization ${token}`,
            }
        });
        const data = res.data;
        return data;
    },
    getAllEmployees: async (): Promise<Employee[]> => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const res = await axios.get<Employee[]>(`${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.employees.employees}`, {
            headers: {
                Authorization: `Authorization ${token}`,
            }
        });
        const data = res.data;
        return data;
    },
    createEmployee: async (data: Employee): Promise<Employee> => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        data.cpf = data.cpf.replace(/\D/g, '');
        data.telefone = data.telefone.replace(/\D/g, '');
        console.log(data);
        const res = await axios.post<Employee>(`${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.employees.employees}`, data, {
            headers: {
                Authorization: `Authorization ${token}`,
            }
        });
        const employee = res.data;
        employee.cpf = maskCPF(employee.cpf);
        employee.telefone = phoneMask(employee.telefone);
        return employee;
    },
    updateEmployee: async (employeeId: string, data: Employee): Promise<Employee> => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        data.cpf = data.cpf.replace(/\D/g, '');
        data.telefone = data.telefone.replace(/\D/g, '');
        const res = await axios.put<Employee>(`${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.employees.employee(employeeId)}`, data, {
            headers: {
                Authorization: `Authorization ${token}`,
            }
        });
        const employee = res.data;
        employee.cpf = maskCPF(employee.cpf);
        employee.telefone = phoneMask(employee.telefone);
        return employee;
    },
    deleteEmployee: async (employeeId: string): Promise<Employee> => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const res = await axios.delete<Employee>(`${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.employees.employee(employeeId)}`, {
            headers: {
                Authorization: `Authorization ${token}`,
            }
        });
        const employee = res.data;
        return employee;
    }
}

export default employeeServices;