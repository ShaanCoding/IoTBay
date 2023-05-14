import { z } from "zod";

export const CategorySchema = z.string().describe("categoryId")

export const CategoryCreateSchema = z.string().describe("name")

export const CategoryDeleteSchema = z.string().describe("categoryId")

export const CategoryDeleteManySchema = z.array(z.string()).describe("categoryIds")

export const CategoryUpdateSchema = z.object({
    oldName: z.string(),
    newName: z.string(),
  })