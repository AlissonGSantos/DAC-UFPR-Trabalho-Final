import { z } from 'zod';

export const UsePointsSchema = z.object({
  miles: z
    .number()
    .nonnegative({ message: 'O valor de milhas deve ser maior ou igual a zero' })
    .optional()
    .refine((value) => value !== undefined, {
      message: 'Selecione ao menos um assento antes de utilizar milhas',
    }),
});

export type UsePointsData = z.infer<typeof UsePointsSchema>;

export const validateMilesInput = (
  value: number, 
  userBalance: number, 
  seatsSelected: number,
  ticketPrice: number = 0
): { isValid: boolean; message?: string; validValue?: number } => {
  if (seatsSelected === 0) {
    return { 
      isValid: false, 
      message: 'Selecione ao menos um assento antes de utilizar milhas',
    };
  }
  
  if (isNaN(value) || value < 0) {
    return { 
      isValid: false, 
      message: 'O valor de milhas deve ser maior ou igual a zero',
      validValue: 0
    };
  }
  
  if (value > userBalance) {
    return {
      isValid: false,
      message: 'Valor excede seu saldo de milhas disponível',
      validValue: userBalance
    };
  }
  
  const subtotal = ticketPrice * seatsSelected;
  const maxMilesAllowed = Math.floor(subtotal / 5);
  
  if (value > maxMilesAllowed) {
    return {
      isValid: false,
      message: 'O valor de milhas excede o valor total da passagem',
      validValue: maxMilesAllowed
    };
  }
  
  return { isValid: true, validValue: value };
};