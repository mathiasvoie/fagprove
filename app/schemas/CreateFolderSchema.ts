import { z } from 'zod';

export const CreateFolderSchema = z.object({
  name: z
    .string()
    .min(8, 'Navnet til mappen må inneholde minst 8 tegn.')
    .max(64, 'Natvet til mappen kan ikke inneholde mere enn 64 tegn.'),
  description: z
    .string()
    .max(250, 'Beskrivelsen kan ikke inneholde mere inneholde 250 tegn.')
    .optional(),
});

export type CreateFolderSchemaType = z.infer<typeof CreateFolderSchema>;
