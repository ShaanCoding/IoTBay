import { FastifyInstance } from "fastify";
import * as controllers from "../controllers";
import { UserDtoRef } from "../schema/UserDto";
import { isLoggedIn, isStaff } from "../helpers/auth";
import { UserCollectionDtoRef } from "../schema/UserCollectionDto";

export default async function usersRouter(fastify: FastifyInstance) {
  fastify.route({
    schema: {
      response: {
        200: UserDtoRef,
        // 204: null,
      },
      operationId: "getMe",
      tags: ["Users"],
    },
    method: "GET",
    url: "me",
    handler: controllers.me,
  });

  fastify.route({
    schema: {
      response: {
        200: UserDtoRef,
      },
      params: {
        type: "object",
        properties: {
          userId: { type: "string" },
        },
      },
      operationId: "getUser",
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: ":userId",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.users,
  });

  fastify.route({
    schema: {
      response: {
        200: UserCollectionDtoRef,
      },
      operationId: "getUsers",
      tags: ["Users"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    method: "GET",
    url: "",
    preValidation: [isLoggedIn, isStaff],
    handler: controllers.users,
  });
}
