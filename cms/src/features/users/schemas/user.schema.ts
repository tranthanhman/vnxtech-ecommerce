import { z } from 'zod';
import type { UserStatus, Role } from '../types';

export const userSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc'),
  status: z.nativeEnum(({} as any as { [k: string]: UserStatus })).nullable(),
  role: z.nativeEnum(({} as any as { [k: string]: Role })).nullable(),
  password: z.string(),
  confirmPassword : z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserFormValues = z.infer<typeof userSchema>;