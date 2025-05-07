import { z } from "zod";

export const SearchFlightSchema = z.object({
  OriginAirport: z.string().optional(),
  DestinationAirport: z.string().optional(),
});

export type SearchFlightSchemaFormData = z.infer<typeof SearchFlightSchema>;