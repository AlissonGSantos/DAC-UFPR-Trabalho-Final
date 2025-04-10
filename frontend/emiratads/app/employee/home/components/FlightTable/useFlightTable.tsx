"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Flight } from "@/app/types/FlightTypes";
import { ButtonProps } from "@/app/components/Button/Button";
import { statusFlightEnum } from "@/app/types/FlightTypes";

const useFlightTable = () => {
  const data: Flight[] = useMemo(() => {
    return [
      {
        codigo: "FL001",
        data: "2023-12-01T10:00:00Z",
        valor_passagem: 500,
        quantidade_poltronas_total: 150,
        quantidade_poltronas_ocupadas: 100,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "GRU",
          nome: "Aeroporto Internacional de São Paulo",
          cidade: "São Paulo",
          uf: "SP",
        },
        aeroporto_destino: {
          codigo: "GIG",
          nome: "Aeroporto Internacional do Rio de Janeiro",
          cidade: "Rio de Janeiro",
          uf: "RJ",
        },
      },
        {
            codigo: "FL002",
            data: "2023-12-02T15:30:00Z",
            valor_passagem: 600,
            quantidade_poltronas_total: 200,
            quantidade_poltronas_ocupadas: 150,
            estado: statusFlightEnum.CANCELADO,
            aeroporto_origem: {
                codigo: "BRC",
                nome: "Aeroporto Internacional de Brasília",
                cidade: "Brasília",
                uf: "DF",
            },
            aeroporto_destino: {
                codigo: "SSA",
                nome: "Aeroporto Internacional de Salvador",
                cidade: "Salvador",
                uf: "BA",
            },
        },
        {
            codigo: "FL003",
            data: "2023-12-03T08:45:00Z",
            valor_passagem: 700,
            quantidade_poltronas_total: 180,
            quantidade_poltronas_ocupadas: 120,
            estado: statusFlightEnum.REALIZADO,
            aeroporto_origem: {
                codigo: "POA",
                nome: "Aeroporto Internacional de Porto Alegre",
                cidade: "Porto Alegre",
                uf: "RS",
            },
            aeroporto_destino: {
                codigo: "REC",
                nome: "Aeroporto Internacional do Recife",
                cidade: "Recife",
                uf: "PE",
            },
        }
    ];
  }, []);

  // Define columns for the DataTable
  const columns: ColumnDef<Flight>[] = useMemo(
    () => [
      {
        accessorKey: "data",
        header: "Data/Hora",
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      },
      {
        accessorKey: "aeroporto_origem.nome",
        header: "Aeroporto de Origem",
        cell: ({ row }) => row.original.aeroporto_origem.nome,
      },
      {
        accessorKey: "aeroporto_destino.nome",
        header: "Aeroporto de Destino",
        cell: ({ row }) => row.original.aeroporto_destino.nome,
      }
    ], []
  );

  // Define controls (buttons) for each row
  const controls: ButtonProps[] = useMemo(
    () => [
      {
        text: "Confirmar Embarque",
        onClick: () => console.log("Abrir modal de confirmação de embarque"),
        type: "PRIMARY",
        size: "SMALL",
        
      },
      {
        text: "Cancelar Voo",
        onClick: () => console.log("Abrir modal de cancelamento de voo"),
        type: "DANGER",
        size: "SMALL",
      },
      {
        text: "Realizar Voo",
        onClick: () => console.log("Abrir modal de realização de voo"),
        type: "SUCCESS",
        size: "SMALL",
      },
    ], []
  );

  return { data, columns, controls };
};

export default useFlightTable;