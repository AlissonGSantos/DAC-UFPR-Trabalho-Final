import { Employee } from "@/app/types/EmployeeTypes";
import axiosInstance from "@/app/services/axiosInstance";
import apiRoutes from "@/app/utils/apiRoutes";
import { maskCPF } from "@/app/utils/cpfMask";
import { phoneMask } from "@/app/utils/phoneMask";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

const employeeServices = {
  getEmployee: async (employeeId: string): Promise<Employee> => {
    const res = await axiosInstance.get<Employee>(
      `${apiUrl}${apiRoutes.employees.employee(employeeId)}`
    );
    const data = res.data;
    return data;
  },

  getAllEmployees: async (): Promise<Employee[]> => {
    const res = await axiosInstance.get<Employee[]>(
      `${apiUrl}${apiRoutes.employees.employees}`
    );
    const data = res.data;
    return data;
  },

  createEmployee: async (data: Employee): Promise<Employee> => {
    const cleanData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ""),
      telefone: data.telefone.replace(/\D/g, ""),
    };

    const res = await axiosInstance.post<Employee>(
      `${apiUrl}${apiRoutes.employees.employees}`,
      cleanData
    );

    const employee = res.data;
    employee.cpf = maskCPF(employee.cpf);
    employee.telefone = phoneMask(employee.telefone);

    return employee;
  },

  updateEmployee: async (
    employeeId: string,
    data: Employee
  ): Promise<Employee> => {
    const cleanData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ""),
      telefone: data.telefone.replace(/\D/g, ""),
    };

    const res = await axiosInstance.put<Employee>(
      `${apiUrl}${apiRoutes.employees.employee(employeeId)}`,
      cleanData
    );

    const employee = res.data;
    employee.cpf = maskCPF(employee.cpf);
    employee.telefone = phoneMask(employee.telefone);

    return employee;
  },

  deleteEmployee: async (employeeId: string): Promise<Employee> => {
    const res = await axiosInstance.delete<Employee>(
      `${apiUrl}${apiRoutes.employees.employee(employeeId)}`
    );
    const employee = res.data;
    return employee;
  },
};

export default employeeServices;
