import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(1, 'Inserisci il nome'),
  surname: z.string().min(1, 'Inserisci il cognome'),
  email: z.email('Email non valida'),
  password: z.string()
    .min(8, { message: 'La password deve contenere almeno 8 caratteri' })
    .max(20, { message: 'La password non può superare i 20 caratteri' })
    .superRefine((p, ctx) => {
      if (!/[A-Z]/.test(p)) {
        ctx.addIssue({
          code: "custom",
          message: 'La password deve contenere almeno una lettera maiuscola',
        });
      }
      if (!/[a-z]/.test(p)) {
        ctx.addIssue({
          code: "custom",
          message: 'La password deve contenere almeno una lettera minuscola',
        });
      }
      if (!/[0-9]/.test(p)) {
        ctx.addIssue({
          code: "custom",
          message: 'La password deve contenere almeno un numero',
        });
      }
      if (!/[!@#$%^&*]/.test(p)) {
        ctx.addIssue({
          code: "custom",
          message: 'La password deve contenere almeno un carattere speciale (!@#$%^&*)',
        });
      }
    }),
  confirmPassword: z.string().min(6, 'Password diversa'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Le password non coincidono',
  path: ['confirmPassword'],
});