import { validateCPF } from '@/app/utils/cpfValidator';
import {z} from 'zod';

export const RegisterSchema = z.object({
  cpf: z.string().nonempty().min(14).max(14).refine((cpf) => validateCPF(cpf), {
    message: 'CPF inválido',
 }),
    email: z.string().email(),
    nome: z.string().nonempty(),
    endereco: z.object({
        cep: z.string().nonempty().min(9).max(9),
        uf: z.string().nonempty(),
        cidade: z.string().nonempty(),
        bairro: z.string().nonempty(),
        rua: z.string().nonempty(),
        numero: z.string().nonempty(),
        complemento: z.string().optional(),
    }),
});