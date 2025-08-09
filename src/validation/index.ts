import { z } from 'zod';
const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(30, { message: 'Name must be no more than 30 characters long' })
  .regex(/^[A-Za-zА-Яа-яЁё-]+$/, { message: 'Name can only contain letters and hyphens' });

export const registerSchema = z
  .object({
    email: z.email('Invalid email format'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
    name: nameSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
