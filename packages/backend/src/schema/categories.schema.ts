import { z } from "zod";

export const CategorySchema = z.string().describe("name")

export const CategoryCreateSchema = z.string().describe("name")

export const CategoryDeleteSchema = z.string().describe("name")

export const CategoryDeleteManySchema = z.array(z.string()).describe("category names")

export const CategoryUpdateSchema = z.object({
    oldName: z.string(),
    newName: z.string(),
  })