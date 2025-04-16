import { z } from 'zod';

export const SearchFlightSchema = z.object({
  OriginAirport: z
    .string()
    .nonempty({ message: 'O aeroporto de origem é obrigatório' })
,
  DestinationAirport: z
    .string()
    .nonempty({ message: 'O aeroporto de destino é obrigatório' })
});

export type SearchFlightSchemaFormData = z.infer<typeof SearchFlightSchema>;