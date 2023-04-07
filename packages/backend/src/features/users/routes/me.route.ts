import { RouteHandler } from "../../..";
import { UserDto, UserDtoRef } from "../models/UserDto";

export default {
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
  // preValidation: [fastifyPassport.authenticate("local", { session: true })],
  handler: async (req, res) => {
    if (!req.user) {
      return res.status(204).send(null);
    }

    const { user } = req;

    return res.status(200).send(user);
  },
} satisfies RouteHandler;
