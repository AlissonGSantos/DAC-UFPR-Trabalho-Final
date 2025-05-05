import { z } from 'zod';
import { maskNumber, convertFromNumberMask } from '@/app/utils/numberMask';

export const UsePointsSchema = z.object({
  miles: z
    .string()
    .min(1, { message: 'O valor de milhas é obrigatório' })
    .transform((value) => {
      const numericValue = convertFromNumberMask(value);
      return numericValue;
    })
    .refine((miles) => miles >= 0, {
      message: 'O valor de milhas deve ser maior ou igual a zero',
    }),
});

export type UsePointsData = z.infer<typeof UsePointsSchema>;