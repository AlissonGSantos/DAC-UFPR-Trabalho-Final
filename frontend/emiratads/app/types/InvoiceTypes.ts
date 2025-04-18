export enum transactionTypeEnum {
    ENTRADA = 'ENTRADA',
    SAIDA = 'SAÍDA'
}

export interface Transaction {
    data: string; // ISO date
    valor: number;
    quantidade_milhas: number;
    tipo: transactionTypeEnum;
    descricao: string;
    codigo_reserva?: number;
}

export interface Invoice {
    codigo: number;
    saldo_milhas: number;
    transacoes: Transaction[];
}