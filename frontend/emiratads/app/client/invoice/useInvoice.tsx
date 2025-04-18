import { useState } from "react";
import { maskCurrency } from "@/app/utils/currencyMask";
import { transactionTypeEnum, Invoice } from "@/app/types/InvoiceTypes";

const useInvoice = () => {
    const invoice: Invoice = {
        codigo: 1,
        saldo_milhas: 10.0,
        transacoes: [
            {
                data: "2025-04-17T18:08:34.651205Z",
                quantidade_milhas: 40.0,
                valor: 200.0,
                descricao: "COMPRA DE MILHAS",
                tipo: transactionTypeEnum.ENTRADA
            },
            {
                data: "2025-04-17T19:22:15.651205Z",
                quantidade_milhas: 30.0,
                codigo_reserva: 123,
                valor: 150.0,
                descricao: "CWB -> GRU",
                tipo: transactionTypeEnum.SAIDA
            },
            {
                data: "2025-04-17T19:25:43.651205Z",
                quantidade_milhas: 5.0,
                valor: 0.0,
                descricao: "CASHBACK",
                tipo: transactionTypeEnum.ENTRADA
            }
        ]
    };

    const [isCardView, setIsCardView] = useState(true);
    const toggleView = () => setIsCardView(!isCardView);

    const columns = [
        {
            accessorKey: "data",
            header: "Data",
            cell: ({ row }: { row: { original: { data: string } } }) => new Date(row.original.data).toLocaleString(),
        },
        { accessorKey: "quantidade_milhas", header: "Milhas" },
        {
            accessorKey: "valor",
            header: "Valor em reais",
            cell: ({ row }: { row: { original: { valor: number } } }) => maskCurrency(row.original.valor),
        },
        { accessorKey: "descricao", header: "Descrição" },
        { accessorKey: "codigo_reserva", header: "Reserva", cell: ({ row }: { row: { original: { codigo_reserva: string } } }) => row.original.codigo_reserva || "-" },
        { accessorKey: "tipo", header: "Tipo" },
    ];

    return {
        invoice,
        isCardView,
        toggleView,
        columns
    };
};

export default useInvoice;