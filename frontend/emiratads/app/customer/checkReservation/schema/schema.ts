import { z } from 'zod';

export const RegisterFlightSchema = z.object({
    CodeReservation: z
      .string()
      .nonempty({ message: 'Informe o código da reserva.' })
  ,
  });