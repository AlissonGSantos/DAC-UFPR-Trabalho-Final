import { validateBoardCode } from "@/app/utils/boardCodeValidator";
import { z } from "zod";

export const BoardSchema = z.object({
    code: z.string()
    .nonempty({ message: 'O código do quadro é obrigatório' })
    .min(6, { message: 'O código do quadro deve ter 6 caracteres' })
    .max(6, { message: 'O código do quadro deve ter 6 caracteres' })
    .refine((code) => validateBoardCode(code), {
        message: 'O código deve ter 3 letras seguidas de 3 números.',
    })
})