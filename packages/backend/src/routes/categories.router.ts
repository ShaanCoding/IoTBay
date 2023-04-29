import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import {
  CategoryCollectionSchemaRef,
  CategorySchemaRef,
  CreateCategoryBodySchemaRef,
  DeleteCategoriesBodySchemaRef,
  DeleteCategoryParamsSchema,
  GetCategoryParamsSchemaRef,
  UpdateCategoryBodySchemaRef,
  UpdateCategoryParamsSchemaRef,
} from "../schema";

/*
  getCategory (GET) /:categoryId
  getCategories (GET) /

  createCategory (POST) /

  deleteCategory (DELETE) /
  deleteCategories (DELETE) /

  updateCategory (PUT) /
*/

export default async function categoriesRouter(fastify: FastifyInstance) {
  // getCategory (GET) /:categoryId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: GetCategoryParamsSchemaRef,
      operationId: "getCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/:categoryId",
    preValidation: [],
    handler: controllers.category,
  });

  // getCategories (GET) /
  fastify.route({
    schema: {
      response: {
        200: CategoryCollectionSchemaRef,
      },
      operationId: "getCategories",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/",
    preValidation: [],
    handler: controllers.categories,
  });

  // createCategory (POST) /
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      body: CreateCategoryBodySchemaRef,
      operationId: "createCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "POST",
    url: "/",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.createCategory,
  });

  // deleteCategory (DELETE) /:productId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: DeleteCategoryParamsSchema,
      operationId: "deleteCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:categoryId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.deleteCategory,
  });

  // deleteCategories (DELETE) /
  fastify.route({
    schema: {
      response: {
        200: CategoryCollectionSchemaRef,
      },
      body: DeleteCategoriesBodySchemaRef,
      operationId: "deleteCategories",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.deleteCategories,
  });

  // updateCategory (PUT) /:categoryId
  fastify.route({
    schema: {
      response: {
        200: CategorySchemaRef,
      },
      params: UpdateCategoryParamsSchemaRef,
      body: UpdateCategoryBodySchemaRef,
      operationId: "updateCategory",
      tags: ["Categories"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "PUT",
    url: "/:categoryId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.updateCategory,
  });
}
