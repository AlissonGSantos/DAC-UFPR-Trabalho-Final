import { validateCPF } from '@/app/utils/cpfValidator';
import { z } from 'zod';

export const RegisterSchema = z.object({
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
  endereco: z.object({
    cep: z
      .string()
      .nonempty({ message: 'O CEP é obrigatório' })
      .min(9, { message: 'O CEP deve ter 9 caracteres (incluindo o traço)' })
      .max(9, { message: 'O CEP deve ter no máximo 9 caracteres' }),
    uf: z
      .string()
      .nonempty({ message: 'O estado (UF) é obrigatório' }),
    cidade: z
      .string()
      .nonempty({ message: 'A cidade é obrigatória' }),
    bairro: z
      .string()
      .nonempty({ message: 'O bairro é obrigatório' }),
    rua: z
      .string()
      .nonempty({ message: 'A rua é obrigatória' }),
    numero: z
      .string()
      .nonempty({ message: 'O número é obrigatório' }),
    complemento: z
      .string()
      .max(100, { message: 'O complemento deve ter no máximo 100 caracteres' })
      .optional(),
  }),
});