import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { isLoggedIn, isStaff } from "../helpers/auth";
import {
  CreateProductBodySchemaRef,
  DeleteProductParamsSchemaRef,
  DeleteProductsBodySchemaRef,
  GetProductParamsSchemaRef,
  ProductSchemaRef,
  ProductsCollectionSchemaRef,
  UpdateProductBodySchemaRef,
  UpdateProductParamSchemaRef,
} from "../schema";

/*
  getProduct (GET) /:productId
  getProducts (GET) /
  createProduct (POST) /
  deleteProduct (DELETE) /
  deleteProducts (DELETE) /
  updateProduct (PUT) /
*/

export default async function productsRouter(fastify: FastifyInstance) {
  // getProduct (GET) /:productId
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: GetProductParamsSchemaRef,
      operationId: "getProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/:productId",
    preValidation: [],
    handler: controllers.product,
  });

  // getProducts (GET) /
  fastify.route({
    schema: {
      response: {
        200: ProductsCollectionSchemaRef,
      },
      operationId: "getProducts",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "/",
    preValidation: [],
    handler: controllers.products,
  });

  // createProduct (POST) /
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      body: CreateProductBodySchemaRef,
      operationId: "createProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "POST",
    url: "/",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.createProduct,
  });

  // deleteProduct (DELETE) /:productId
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: DeleteProductParamsSchemaRef,
      operationId: "deleteProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.deleteProduct,
  });

  // deleteProducts (DELETE) /
  fastify.route({
    schema: {
      response: {
        200: ProductsCollectionSchemaRef,
      },
      body: DeleteProductsBodySchemaRef,
      operationId: "deleteProducts",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "DELETE",
    url: "/",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.deleteProducts,
  });

  // updateProduct (PUT) /:productId
  fastify.route({
    schema: {
      response: {
        200: ProductSchemaRef,
      },
      params: UpdateProductParamSchemaRef,
      body: UpdateProductBodySchemaRef,
      operationId: "updateProduct",
      tags: ["Products"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "PUT",
    url: "/:productId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.updateProduct,
  });
}
