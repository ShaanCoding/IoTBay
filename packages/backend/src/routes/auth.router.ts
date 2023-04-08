import { FastifyInstance } from "fastify";
import { LoginDtoRef } from "../schema/LoginDto";
import { UserDtoRef } from "../schema/UserDto";
import fastifyPassport from "@fastify/passport";
import * as controllers from "../controllers";
import { RegisterDtoRef } from "../schema/RegisterDto";

export default async function authRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    schema: {
      body: LoginDtoRef,
      response: {
        200: UserDtoRef,
      },
      operationId: "login",
      tags: ["Authentication"],
    },
    url: "login",
    preValidation: [
      fastifyPassport.authenticate("local", {
        authInfo: false,
        session: true,
      }),
    ],
    handler: controllers.login,
  });

  fastify.route({
    method: "POST",
    url: "logout",
    schema: {
      operationId: "logout",
      tags: ["Authentication"],
      security: [
        {
          sessionid: [],
        },
      ],
    },
    handler: controllers.logout,
  });

  fastify.route({
    schema: {
      body: RegisterDtoRef,
      response: {
        201: UserDtoRef,
      },
      operationId: "register",
      tags: ["Authentication"],
    },
    method: "POST",
    url: "register",
    handler: controllers.register,
  });
}
