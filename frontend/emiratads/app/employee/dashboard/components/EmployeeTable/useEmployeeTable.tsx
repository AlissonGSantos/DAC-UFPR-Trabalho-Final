"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/app/types/EmployeeTypes";

const useEmployeeTable = () => {
  const [employeeValue, setEmployeeValue] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sortEmployeesByName = (employees: Employee[]) => {
    return employees.sort((a, b) => a.nome.localeCompare(b.nome));
  };

  const [data, setData] = useState<Employee[]>(
    sortEmployeesByName([
      {
        codigo: 1,
        cpf: "123.456.789-09", // CPF válido
        nome: "João Silva",
        email: "joao.silva@example.com",
        telefone: "(41) 99999-9999",
        ativo: true,
      },
      {
        codigo: 2,
        cpf: "987.654.321-00",
        nome: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        telefone: "(41) 98888-8888",
        ativo: false,
      },
      {
        codigo: 3,
        cpf: "496.611.080-72",
        nome: "Carlos Santos",
        email: "carlos.santos@example.com",
        telefone: "(41) 97777-7777",
        ativo: true,
      },
    ])
  );

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
        setData((prevData) =>
          sortEmployeesByName(
            prevData.map((item) =>
              item.codigo === employee.codigo ? { ...item, ...employee } : item
            )
          )
        );
      } else {
        setData((prevData) =>
          sortEmployeesByName([
            ...prevData,
            { ...employee, codigo: prevData.length + 1 },
          ])
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
      setData((prevData) =>
        sortEmployeesByName(
          prevData.map((employee) => {
            if (employee.codigo === employeeValue?.codigo) {
              return { ...employee, ativo: false };
            }
            return employee;
          })
        )
      );
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
