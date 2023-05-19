import { z } from "zod";
import validator from 'validator'

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(3).max(100),
  phone: z.string().refine(validator.isMobilePhone, {
    message: 'Invalid phone number',
  }),
  address: z.string().min(3).max(100),
  sex: z.enum(["male", "female", "other"]).optional()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
