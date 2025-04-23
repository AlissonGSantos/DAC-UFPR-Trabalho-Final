"use client"

import { Transaction } from "@/app/types/InvoiceTypes";
import React from "react";
import Link from "next/link";
import { AirplaneTakeoff } from "phosphor-react";

export interface transactionProps {
    transaction: Transaction
}

const TransactionCard: React.FC<transactionProps> = ({ transaction }) => {
    const isEntrada = transaction.tipo === "ENTRADA";
    const formattedDate = new Date(transaction.data).toLocaleString();

    return (
        <div className="w-5/6 rounded-sm bg-slate-800 p-4 text-slate-300 border-b-2 border-slate-300">
            <div className="text-lg font-semibold uppercase opacity-60">{transaction.tipo}</div>
            <div className={`text-3xl font-semibold ${isEntrada ? "text-green-500" : "text-red-500"}`}>
                {isEntrada ? transaction.quantidade_milhas : `${transaction.quantidade_milhas}`}
            </div>
            <div className="text-sm my-2">
                {transaction.descricao.includes("->") ? (
                    <>
                        {transaction.descricao.split("->")[0]}
                        <AirplaneTakeoff size={22} className="inline mx-1" />
                        {transaction.descricao.split("->")[1]}
                    </>
                ) : (
                    transaction.descricao
                )}
            </div>
            {transaction.codigo_reserva && (
                <Link
                    href={`/client/reserva/${transaction.codigo_reserva}`}
                    className="text-xs text-indigo-400 underline">
                    Ver reserva
                </Link>
            )}
            <div className="text-xs text-slate-400 text-right">{formattedDate}</div>
        </div>
    );
}

export default TransactionCard;