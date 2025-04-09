import { z } from 'zod';

export const RegisterFlightSchema = z.object({
  OriginAirport: z
    .string()
    .nonempty({ message: 'O aeroporto de origem é obrigatório' })
,
  DestinationAirport: z
    .string()
    .nonempty({ message: 'O aeroporto de destino é obrigatório' })
,
  dateTimeFlight: z
    .string()
    .nonempty({ message: 'A data e hora são obrigatórias' })
,
  seatsQuantity: z
    .string()
    .nonempty({ message: 'A quantidade de poltronas é obrigatório'})
,
  ticketValue: z
  .string()
  .nonempty({ message: 'O valor da passagem é obrigatório'})
,
  miles: z
  .string()
});