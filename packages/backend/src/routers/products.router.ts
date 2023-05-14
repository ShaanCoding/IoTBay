import { t } from "../trpc";
import { publicProcedure, staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import { ProductCreateSchema, ProductDeleteManySchema, ProductSchema, ProductUpdateSchema } from "../schema/products.schema";

export const productsRouterDefinition = t.router({
  /**
   * Get a product
   */
  product: publicProcedure
    .input(ProductSchema)
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: {
          productId: input,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product not found",
        });
      }

      return product;
    }),

  /**
   * Get all products
   */
  products: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();

    return products;
  }),

  /**
   * Create a product
   */
  create: staffProcedure
    .input(ProductCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, price, stock, image, description, category } = input;

      const product = await ctx.prisma.product.create({
        data: {
          name,
          price,
          stock,
          image,
          description,
          Category: {
            connectOrCreate: {
              where: {
                name: category,
              },
              create: {
                name: category,
              },
            }
          },
        },
      });

      return product;
    }),

  /**
   * Delete a product
   */
  delete: staffProcedure.input(ProductSchema).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findUnique({
      where: {
        productId: input,
      },
    });

    if (!product) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product not found",
      });
    }

    return ctx.prisma.product.delete({
      where: {
        productId: input,
      },
    });
  }),

  /**
   * Delete many products
   */
  deleteMany: staffProcedure
    .input(ProductDeleteManySchema)
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          productId: {
            in: input,
          },
        },
      });

      if (!products) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product not found",
        });
      }

      return ctx.prisma.product.deleteMany({
        where: {
          productId: {
            in: input,
          },
        },
      });
    }),

  /**
   * Update a product
   */
  update: staffProcedure
    .input(
      ProductUpdateSchema
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, name, price, stock, image, description, category } =
        input;

      const product = await ctx.prisma.product.findUnique({
        where: {
          productId,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product not found",
        });
      }

      return ctx.prisma.product.update({
        where: {
          productId,
        },
        data: {
          name,
          price,
          stock,
          image,
          description,
          category,
        },
      });
    }),
});
