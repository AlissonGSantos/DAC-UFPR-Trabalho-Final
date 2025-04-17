"use client"

import React, { useState } from "react";
import { robotoFont } from "@/app/assets/fontsSetup";
import useInvoice from "./useInvoice";
import TransactionCard from "./components/transaction/transactionCard";
import DataTable from "@/app/components/DataTable/DataTable";
import { maskCurrency } from "@/app/utils/currencyMask";
import Button from "@/app/components/Button/Button";

const Invoice = () => {
    const { invoice } = useInvoice();
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
        { accessorKey: "tipo", header: "Tipo" },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-10">
                <h1 className={`text-2xl mx-6 font-bold uppercase ${robotoFont.className} text-slate-300`}>
                    Extrato de Milhas
                </h1>
                <Button
                    onClick={toggleView}
                    size="SMALL"
                    extraClass="self-end">
                    {isCardView ? "Visão de tabela" : "Visão de cartões"}
                </Button>
                {isCardView ? (
                    <div className="flex flex-col p-4 rounded-lg gap-6 my-8">
                        {invoice.transacoes.map((transacao) => (
                            <TransactionCard key={transacao.data} transaction={transacao} />
                        ))}
                    </div>
                ) : (
                    <DataTable data={invoice.transacoes} columns={columns} />
                )}
            </div>
        </div>
    );
};

export default Invoice;