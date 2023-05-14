import { z } from "zod";

export const ProductSchema = z.string().describe("productId");

export const ProductCreateSchema = z.object({
  name: z.string(),
  price: z.number().gte(0),
  stock: z.number().int(),
  image: z.string().url(),
  description: z.string(),
  category: z.string(),
});

export const ProductDeleteManySchema = z
  .array(z.string())
  .describe("productIds");

export const ProductUpdateSchema = z.object({
  productId: z.string(),
  name: z.string().optional(),
  price: z.number().gte(0).optional(),
  stock: z.number().int().optional(),
  image: z.string().url().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});
