import { z } from 'zod';

export const CheckReservationSchema = z.object({
    CodeReservation: z
      .string()
      .nonempty({ message: 'Informe o código da reserva.' })
  ,
  });