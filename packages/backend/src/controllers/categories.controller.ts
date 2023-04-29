import {
  CreateCategoryBodySchemaType,
  DeleteCategoriesBodySchemaType,
  DeleteCategoryParamsSchemaType,
  GetCategoryParamsSchemaType,
  UpdateCategoryBodySchemaType,
  UpdateCategoryParamsSchemaType,
} from "../schema";
import prisma from "../services/prisma.service";

import { FastifyRequest, FastifyReply } from "fastify";

// getCategory (GET) /:categoryId

/**
 * Get a category by its categoryId
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns The category with the given categoryId
 */
export const category = async (
  request: FastifyRequest<{ Params: GetCategoryParamsSchemaType }>,
  reply: FastifyReply
) => {
  const { categoryId } = request.params;

  const category = await prisma.productCategory.findUnique({
    where: {
      categoryId,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!category) {
    return reply.notFound("Category not found");
  }

  return reply.status(200).send(category);
};

// getCategories (GET) /
export const categories = async (
  request: FastifyRequest<{}>,
  reply: FastifyReply
) => {
  const categories = await prisma.productCategory.findMany({
    select: {
      categoryId: true,
      name: true,
    },
  });

  return reply.status(200).send(categories);
};

// createCategory (POST) /
export const createCategory = async (
  request: FastifyRequest<{ Body: CreateCategoryBodySchemaType }>,
  reply: FastifyReply
) => {
  const { name } = request.body;

  // Check if category already exists

  const categoryExists = await prisma.productCategory.findFirst({
    where: {
      name,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (categoryExists) {
    return reply.badRequest("Category already exists");
  }

  const category = await prisma.productCategory.create({
    data: {
      name,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!category) {
    return reply.internalServerError("Failed to create category");
  }

  return reply.status(201).send(category);
};

// deleteCategory (DELETE) /
export const deleteCategory = async (
  request: FastifyRequest<{ Params: DeleteCategoryParamsSchemaType }>,
  reply: FastifyReply
) => {
  const { categoryId } = request.params;

  const category = await prisma.productCategory.findUnique({
    where: {
      categoryId,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!category) {
    return reply.notFound("Category not found");
  }

  const deletedCategory = await prisma.productCategory.delete({
    where: {
      categoryId,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!deletedCategory) {
    return reply.internalServerError("Failed to delete category");
  }

  return reply.status(200).send(deletedCategory);
};

// deleteCategories (DELETE) /
export const deleteCategories = async (
  request: FastifyRequest<{
    Body: DeleteCategoriesBodySchemaType;
  }>,
  reply: FastifyReply
) => {
  const { categoryIds } = request.body;

  if (!categoryIds || categoryIds.length === 0) {
    return reply.badRequest("No categoryIds provided");
  }

  const categories = await prisma.productCategory.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (categories.length === 0) {
    return reply.notFound("No categories found");
  }

  if (categories.length !== categoryIds.length) {
    return reply.badRequest("One or more categories not found");
  }

  const deletedCategories = await prisma.productCategory.deleteMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
  });

  if (!deletedCategories.count) {
    return reply.internalServerError("Failed to delete categories");
  }

  return reply.status(200).send(categories);
};

// updateCategory (PUT) /
export const updateCategory = async (
  request: FastifyRequest<{
    Params: UpdateCategoryParamsSchemaType;
    Body: UpdateCategoryBodySchemaType;
  }>,
  reply: FastifyReply
) => {
  const { categoryId } = request.params;
  const { name } = request.body;

  if (!categoryId) {
    return reply.badRequest("No categoryId provided");
  }

  if (!name) {
    return reply.badRequest("No name provided");
  }

  const category = await prisma.productCategory.findUnique({
    where: {
      categoryId,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!category) {
    return reply.notFound("Category not found");
  }

  const updatedCategory = await prisma.productCategory.update({
    where: {
      categoryId,
    },
    data: {
      name,
    },
    select: {
      categoryId: true,
      name: true,
    },
  });

  if (!updatedCategory) {
    return reply.internalServerError("Failed to update category");
  }

  return reply.status(200).send(updatedCategory);
};
