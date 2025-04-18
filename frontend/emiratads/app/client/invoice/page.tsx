"use client"

import React, { useState } from "react";
import { robotoFont } from "@/app/assets/fontsSetup";
import useInvoice from "./useInvoice";
import TransactionCard from "./components/transaction/transactionCard";
import DataTable from "@/app/components/DataTable/DataTable";
import Button from "@/app/components/Button/Button";

const Invoice = () => {
    const { invoice, isCardView, toggleView, columns } = useInvoice();

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