import { Flight } from "@/app/types/FlightTypes";
import { maskCurrency } from "@/app/utils/currencyMask";
import { ColumnDef } from "@tanstack/react-table";

const useFlightsTable = () => {
  const columns: ColumnDef<Flight>[] = [
    {
      accessorKey: "codigo",
      header: "Código",
    },
    {
      accessorKey: "data",
      header: "Data",
      cell: ({ row }) => new Date(row.getValue("data")).toLocaleString(),
    },
    {
      accessorKey: "valor_passagem",
      header: "Valor Passagem",
      cell: ({ row }) => `${maskCurrency(row.getValue("valor_passagem"))}`,
    },
    {
      accessorKey: "quantidade_poltronas_ocupadas",
      header: "Poltronas Ocupadas",
    },
    {
      accessorKey: "estado",
      header: "Estado",
    },
    {
      accessorKey: "aeroporto_origem.nome",
      header: "Aeroporto Origem",
    },
    {
      accessorKey: "aeroporto_destino.nome",
      header: "Aeroporto Destino",
    },
  ];

  return {
    columns,
  };
};

export default useFlightsTable;
