import { validateCPF } from "@/app/utils/cpfValidator";
import { z } from "zod";

export const EmployeeSchema = z.object({
  codigo: z.number().optional(),
  cpf: z
    .string()
    .nonempty({ message: 'O CPF é obrigatório' })
    .min(14, { message: 'O CPF deve ter 14 caracteres (incluindo pontuação)' })
    .max(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
    .refine((cpf) => validateCPF(cpf), {
      message: 'CPF inválido',
    }),
    email: z
    .string()
    .nonempty({ message: 'O e-mail é obrigatório' })
    .email({ message: 'O e-mail deve ser válido' }),
  nome: z
    .string()
    .nonempty({ message: 'O nome é obrigatório' }),
  telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido").nonempty({ message: 'O telefone é obrigatório' }),
  ativo: z.boolean(),
});