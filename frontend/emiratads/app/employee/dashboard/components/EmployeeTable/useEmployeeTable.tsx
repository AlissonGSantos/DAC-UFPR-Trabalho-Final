"use client";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/app/types/EmployeeTypes";

const useEmployeeTable = () => {
  const [employeeValue, setEmployeeValue] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const [data, setData] = useState<Employee[]>([
    {
      codigo: 1,
      cpf: "123.456.789-00",
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
      cpf: "456.789.123-00",
      nome: "Carlos Santos",
      email: "carlos.santos@example.com",
      telefone: "(41) 97777-7777",
      ativo: true,
    },
  ]);

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

  const onSubmit = async (data: Employee) => {
    setData((prevData) => [...prevData, data]);
  };

  useEffect(() => {
    console.log("altered", data);
  }, [data]);

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
  };
};

export default useEmployeeTable;
