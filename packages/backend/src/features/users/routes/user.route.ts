import { RouteHandler } from "../../..";
import prisma from "../../../services/prisma";
import server from "../../../services/server";
import { checkIsLoggedIn, checkIsStaff } from "../../auth";
import { UserDto } from "../models/UserDto";

interface UserRouteParams {
  id: string;
}

export default {
  schema: {
    response: {
      200: UserDto,
    },
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
  method: "GET",
  url: ":id",
  preValidation: [server.auth([checkIsLoggedIn, checkIsStaff])],
  handler: async (req, res) => {
    const { id } = req.params as UserRouteParams;

    const user = await prisma.user.findUnique({
        where: {
            id,
        }, select: {
            email: true,
            id: true,
            isStaff: true,
        }
    });

    if (!user) {
        return res.notFound("User not found");
    }

    return res.status(200).send(user);
  },
} satisfies RouteHandler;
