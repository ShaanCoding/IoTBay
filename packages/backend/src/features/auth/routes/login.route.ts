import { RouteHandler } from "../../..";
import { LoginDto } from "../models/LoginDto";
import { UserDto } from "../../users/models/UserDto";
import fastifyPassport from "@fastify/passport";

export default {
  method: "POST",
  schema: {
    body: LoginDto,
    response: {
      200: UserDto,
    },
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
