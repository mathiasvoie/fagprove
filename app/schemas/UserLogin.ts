import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z.string().email('Må være en gyldig epost adresse.'),
  password: z.string(),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
