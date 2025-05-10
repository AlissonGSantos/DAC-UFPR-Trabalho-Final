import { z } from "zod";

export const MileagePurchaseSchema = z.object({
  miles: z
    .number()
    .min(1, { message: "A quantidade de milhas deve ser maior que zero." })
});

export type MileagePurchaseFormData = z.infer<typeof MileagePurchaseSchema>;