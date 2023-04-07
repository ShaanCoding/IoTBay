import { RouteHandler } from "../../..";
import { LoginDto, LoginDtoRef } from "../models/LoginDto";
import { UserDto, UserDtoRef } from "../../users/models/UserDto";
import fastifyPassport from "@fastify/passport";

export default {
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
  handler: (req, res) => {
    const user = req.user;

    if (!user) {
      return res.badRequest("Invalid credentials");
    }

    return res.status(200).send(user);
  },
} as RouteHandler;
