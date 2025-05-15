import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/contexts/auth";
import { maskCurrency } from "@/app/utils/currencyMask";
import { Invoice, FilterOptions } from "@/app/types/InvoiceTypes";
import milesServices from "@/app/mileage/services/milesServices";

const useInvoice = () => {
  const { userData, updateMilesBalance } = useAuthContext();
  const [invoice, setInvoice] = useState<Invoice>();
  const [isCardView, setIsCardView] = useState(true);
  const [filter, setFilter] = useState<FilterOptions>("all");

  const toggleView = () => setIsCardView(!isCardView);

  const filterTransactionsByDate = (
    transactions: Invoice["transacoes"],
    filter: FilterOptions
  ): Invoice["transacoes"] => {
    const now = new Date();
    let startDate: Date;

    switch (filter) {
      case "lastWeek":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "lastTenDays":
        startDate = new Date(now.setDate(now.getDate() - 10));
        break;
      case "lastMonth":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "lastYear":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return transactions;
    }

    return transactions.filter(
      (transaction) => new Date(transaction.data) >= startDate
    );
  };

  const filteredTransactions = invoice
    ? filterTransactionsByDate(invoice.transacoes, filter)
    : [];

  const columns = [
    {
      accessorKey: "data",
      header: "Data",
      cell: ({ row }: { row: { original: { data: string } } }) =>
        new Date(row.original.data).toLocaleString(),
    },
    { accessorKey: "quantidade_milhas", header: "Milhas" },
    {
      accessorKey: "valor",
      header: "Valor em reais",
      cell: ({ row }: { row: { original: { valor: number } } }) =>
        maskCurrency(row.original.valor),
    },
    { accessorKey: "descricao", header: "Descrição" },
    {
      accessorKey: "codigo_reserva",
      header: "Reserva",
      cell: ({ row }: { row: { original: { codigo_reserva: string } } }) =>
        row.original.codigo_reserva || "-",
    },
    { accessorKey: "tipo", header: "Tipo" },
  ];

  const fetchInvoice = async () => {
    try {
      const codigo = userData?.usuario.codigo;

      if (codigo) {
        const response = await milesServices.getMiles(codigo);

        updateMilesBalance(response.saldo_milhas);
        setInvoice(response);
      }
    } catch (error) {
      console.error("Erro ao buscar milhas:", error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [userData]);

  return {
    invoice,
    isCardView,
    toggleView,
    columns,
    milescore: userData?.usuario.saldo_milhas,
    filteredTransactions,
    filter,
    setFilter,
  };
};

export default useInvoice;
