import { RouteHandler } from "../../..";
import { UserDto } from "../models/UserDto";

export default {
  schema: {
    response: {
      200: UserDto,
      // 204: null,
    },
  },
  method: "GET",
  url: "me",
  // preValidation: [fastifyPassport.authenticate("local", { session: true })],
  handler: async (req, res) => {
    if (!req.user) {
      return res.status(204).send(null);
    }

    const { user } = req;

    return res.status(200).send({
      email: user.email,
      id: user.id,
      isStaff: user.isStaff,
    });
  },
} satisfies RouteHandler;
