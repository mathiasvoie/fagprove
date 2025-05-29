import { z } from 'zod';

export const CreateToolSchema = z.object({
  name: z
    .string()
    .min(3, 'Navn må inneholde minst 3 tegn.')
    .max(100, 'Navn kan ikke inneholde mer enn 100 tegn.'),
  description: z
    .string()
    .max(250, 'Beskrivelsen kan ikke inneholde mere inneholde 250 tegn.')
    .optional(),
});

export type CreateToolSchemaType = z.infer<typeof CreateToolSchema>;
