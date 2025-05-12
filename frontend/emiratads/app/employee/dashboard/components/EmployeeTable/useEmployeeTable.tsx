"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/app/types/EmployeeTypes";
import EmployeeService from "@/app/employee/services/employeeService";
import { maskCPF } from "@/app/utils/cpfMask";
import { phoneMask } from "@/app/utils/phoneMask";

const useEmployeeTable = () => {
  const [employeeValue, setEmployeeValue] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Employee[]>([]);

  const sortEmployeesByName = (employees: Employee[]) => {
    return employees.sort((a, b) => a.nome.localeCompare(b.nome));
  };

  useState(() => {
    const fetchData = async () => {
      try {
        const employees = await EmployeeService.getAllEmployees();
        employees.forEach((employee) => {
          employee.cpf = maskCPF(employee.cpf);
          employee.telefone = phoneMask(employee.telefone)
        });
        setData(sortEmployeesByName(employees));
      } catch (error) {
        console.error("Error fetching employees:", error);
        setData([]);
      }
    };
    fetchData();
  });

  const handleEdit = (employee: Employee) => {
    setEmployeeValue(employee);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeValue(employee);
    setDeleteModalOpen(true);
  };

  const handleRegisterClick = () => {
    setEmployeeValue(null);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const onSubmit = async (employee: Employee) => {
    try {
      if (isEditing) {
        const updatedEmployee = await EmployeeService.updateEmployee(
          String(employeeValue?.codigo),
          employee
        );
        setData((prevData) =>
          sortEmployeesByName(
            prevData.map((emp) => {
              if (emp.codigo === updatedEmployee.codigo) {
                return { ...updatedEmployee, ativo: emp.ativo };
              }
              return emp;
            })
          )
        );
      } else {
        const newEmployee = await EmployeeService.createEmployee(employee);
        setData((prevData) =>
          sortEmployeesByName([...prevData, { ...newEmployee, ativo: true }])
        );
      }

      if (!hasError) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onDelete = async () => {
    try {
      if (employeeValue) {
        await EmployeeService.deleteEmployee(String(employeeValue.codigo));
        setData((prevData) =>
          prevData.filter((emp) => emp.codigo !== employeeValue.codigo)
        );
      }
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "ativo",
      header: "Ativo",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-green-500 font-bold">Sim</span>
        ) : (
          <span className="text-red-500 font-bold">Não</span>
        ),
    },
  ];

  return {
    data,
    columns,
    setData,
    employeeValue,
    setEmployeeValue,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    handleEdit,
    deleteModalOpen,
    handleRegisterClick,
    onSubmit,
    isEditing,
    hasError,
    setHasError,
    setDeleteModalOpen,
    onDelete,
  };
};

export default useEmployeeTable;
