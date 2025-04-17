import { useState, useEffect, useMemo } from "react";
import { transactionTypeEnum, Transaction, Invoice } from "@/app/types/InvoiceTypes";

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

    return {
        invoice
    };
};

export default useInvoice;