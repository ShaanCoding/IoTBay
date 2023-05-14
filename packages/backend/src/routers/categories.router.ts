import { t } from "../trpc";
import { publicProcedure, staffProcedure } from "../trpc/utils";
import { TRPCError } from "@trpc/server";
import {
  CategorySchema,
  CategoryDeleteManySchema,
  CategoryDeleteSchema,
  CategoryUpdateSchema,
} from "../schema/categories.schema";
import { CategoryCreateSchema } from "../schema/categories.schema";

export const categoryRouterDefinition = t.router({
  category: publicProcedure
    .input(CategorySchema)
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.productCategory.findUnique({
        where: {
          name: input,
        },
      });

      if (!category) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category not found",
        });
      }

      return category;
    }),

  categories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.productCategory.findMany();

    return categories;
  }),

  create: staffProcedure
    .input(CategoryCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const name = input;

      const category = await ctx.prisma.productCategory.upsert({
        where: {
          name: name,
        },
        update: {},
        create: {
          name,
        },
      });

      return category;
    }),

  delete: staffProcedure
    .input(CategoryDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      const name = input;

      const existingCategory = await ctx.prisma.productCategory.findUnique({
        where: {
          name,
        },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category not found",
        });
      }

      const category = await ctx.prisma.productCategory.delete({
        where: {
          name,
        },
      });

      return category;
    }),

  deleteMany: staffProcedure
    .input(CategoryDeleteManySchema)
    .mutation(async ({ ctx, input }) => {
      const categoryIds = input;

      const existingCategories = await ctx.prisma.productCategory.findMany({
        where: {
          name: {
            in: categoryIds,
          },
        },
      });

      if (!existingCategories.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Categories not found",
        });
      }

      const categories = await ctx.prisma.productCategory.deleteMany({
        where: {
          name: {
            in: categoryIds,
          },
        },
      });

      return categories;
    }),

  update: staffProcedure
    .input(CategoryUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { newName, oldName } = input;

      const existingCategory = await ctx.prisma.productCategory.findUnique({
        where: {
          name: oldName,
        },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category not found",
        });
      }

      const category = await ctx.prisma.productCategory.update({
        where: {
          name: oldName,
        },
        data: {
          name: newName,
        },
      });

      return category;
    }),
});
