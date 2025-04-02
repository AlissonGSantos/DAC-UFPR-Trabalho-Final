import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'O e-mail é obrigatório' })
    .email({ message: 'O e-mail deve ser válido' }),
  password: z
    .string()
    .nonempty({ message: 'Insira uma senha válida' })
});