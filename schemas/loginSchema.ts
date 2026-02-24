import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, 'Email richiesta').email('Formato email non valido'),
  password: z.string().min(1, 'Password richiesta'),
});
