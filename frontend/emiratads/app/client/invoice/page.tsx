"use client"

import { robotoFont } from "@/app/assets/fontsSetup";
import useInvoice from "./useInvoice";
import Link from "next/link";
import TransactionCard from "./components/transaction/transactionCard";
import DataTable from "@/app/components/DataTable/DataTable";
import Button from "@/app/components/Button/Button";
import SelectInput from "@/app/components/SelectInput/SelectInput";


const Invoice = () => {
    const { invoice, filter, isCardView, toggleView, columns, milescore, filteredTransactions, setFilter } = useInvoice();

    const filterOptions = [
        { value: "all", label: "Todos" },
        { value: "lastWeek", label: "Última semana" },
        { value: "lastTenDays", label: "Últimos 10 dias" },
        { value: "lastMonth", label: "Último mês" },
        { value: "lastYear", label: "Último ano" },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-10">
                <div className="flex justify-between itens-center mx-6 py-6 mb-4 border-b border-indigo-800">
                    <h1 className={`text-2xl mx font-bold uppercase ${robotoFont.className} text-slate-300`}>
                        Extrato de Milhas
                    </h1>
                    <div className="flex flex-col justify-center items-end flex-1">
                        <h1 className="text-xl font-bold text-slate-300">
                            Seu saldo em milhas: {milescore}
                        </h1>
                        <Link
                            href={`/mileage/home`}
                            className="text-xs text-indigo-400 underline">
                            Comprar milhas
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between mx-6 gap-4">
                    <Button
                        onClick={toggleView}
                        size="SMALL">
                        {isCardView ? "Visão de tabela" : "Visão de cartões"}
                    </Button>
                    <SelectInput
                        options={filterOptions}
                        value={filterOptions.find((opt) => opt.value === filter)?.value}
                        onChange={(e) => setFilter(e.target.value as any)}
                        label="Filtrar por data"
                    />
                </div>
                {isCardView ? (
                    <div className="flex flex-col p-4 rounded-lg gap-6 my-1">
                        {filteredTransactions.map((transacao) => (
                            <TransactionCard key={transacao.data} transaction={transacao} />
                        ))}
                    </div>
                ) : (
                    <DataTable data={filteredTransactions} columns={columns} />
                )}
            </div>
        </div>
    );
};

export default Invoice;