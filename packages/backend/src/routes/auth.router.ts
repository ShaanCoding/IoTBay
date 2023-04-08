import { FastifyInstance } from "fastify";
import { LoginSchemaRef } from "../schema/login.schema";
import { UserSchemaRef } from "../schema/user.schema";
import fastifyPassport from "@fastify/passport";
import * as controllers from "../controllers";
import { RegisterSchemaRef } from "../schema/register.schema";

export default async function authRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    schema: {
      body: LoginSchemaRef,
      response: {
        200: UserSchemaRef,
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
      body: RegisterSchemaRef,
      response: {
        201: UserSchemaRef,
      },
      operationId: "register",
      tags: ["Authentication"],
    },
    method: "POST",
    url: "register",
    handler: controllers.register,
  });
}
