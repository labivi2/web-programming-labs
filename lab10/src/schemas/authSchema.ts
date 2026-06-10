import { z } from 'zod';

export const authSchema = z.object({
  email: z.email('Введіть правильний email'),
  password: z.string().min(8, 'Пароль має містити мінімум 8 символів'),
});

export type AuthFormData = z.infer<typeof authSchema>;
