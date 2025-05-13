"use client";

import { useState, useEffect, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/app/types/EmployeeTypes";
import employeeServices from "@/app/employee/services/employeeService";
import { maskCPF } from "@/app/utils/cpfMask";
import { phoneMask } from "@/app/utils/phoneMask";

const useEmployeeTable = () => {
  const [employeeValue, setEmployeeValue] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const sortEmployeesByName = (employees: Employee[]) => {
    return [...employees].sort((a, b) => a.nome.localeCompare(b.nome));
  };

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const employees = await employeeServices.getAllEmployees();
      console.log("Fetched employees:", employees);
      const formattedEmployees = employees.map((employee) => ({
        ...employee,
        cpf: maskCPF(employee.cpf),
        telefone: phoneMask(employee.telefone),
      }));

      setData(sortEmployeesByName(formattedEmployees));
    } catch (error) {
      console.error("Error fetching employees:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

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
      setLoading(true);

      if (isEditing && employeeValue) {
        const updatedEmployee = await employeeServices.updateEmployee(
          String(employeeValue.codigo),
          employee
        );

        setData((prevData) =>
          sortEmployeesByName(
            prevData.map((emp) =>
              emp.codigo === updatedEmployee.codigo
                ? { ...updatedEmployee, ativo: emp.ativo }
                : emp
            )
          )
        );
      } else {
        const newEmployee = await employeeServices.createEmployee(employee);
        setData((prevData) =>
          sortEmployeesByName([...prevData, { ...newEmployee, ativo: true }])
        );
      }

      if (!hasError) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!employeeValue) return;

    try {
      setLoading(true);
      await employeeServices.deleteEmployee(String(employeeValue.codigo));
      setData((prevData) =>
        prevData.filter((emp) => emp.codigo !== employeeValue.codigo)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setHasError(true);
    } finally {
      setLoading(false);
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
    loading,
    employeeValue,
    setEmployeeValue,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    handleEdit,
    deleteModalOpen,
    setDeleteModalOpen,
    handleRegisterClick,
    onSubmit,
    isEditing,
    hasError,
    setHasError,
    onDelete,
    refreshData: fetchEmployees,
  };
};

export default useEmployeeTable;
