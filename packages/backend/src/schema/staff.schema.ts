import { z } from "zod";

export const StaffActivateSchema = z.object({
  userId: z.string(),
  position: z.string(),
})

export const StaffListSchema = z
.object({
  position: z.string().optional(),
})
.optional()


export const StaffCreateSchema = z.object({
  name: z.string(),
  address: z.string(),
  position: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
})

export const StaffDeleteSchema = z.string().describe("userId")

export const StaffDeactivateSchema = z.string().describe("userId")