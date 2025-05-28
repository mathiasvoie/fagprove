import { z } from 'zod';

export const RegisterUserSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Navnet må inneholde minst 3 tegn.')
      .max(96, 'Navnet kan ikke inneholde mere enn 96 tegn.'),
    email: z.string().email('Må være en gyldig epost adresse.'),
    password: z
      .string()
      .min(8, 'Passordet må inneholde minst 8 tegn.')
      .max(64, 'Passordet kan ikke inneholde mere enn 64 tegn.')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Passordet må inneholde minst ett spesialtegn.',
      ),
    confirm_password: z
      .string()
      .min(8, 'Passordet må inneholde minst 8 tegn.')
      .max(64, 'Passordet kan ikke inneholde mere enn 64 tegn.')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Passordet må inneholde minst ett spesialtegn.',
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passordene må være like.',
    path: ['confirm_password'],
  });

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
