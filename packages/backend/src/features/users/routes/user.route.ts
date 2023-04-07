import { RouteHandler } from "../../..";
import prisma from "../../../services/prisma";
import server from "../../../services/server";
import { checkIsLoggedIn, checkIsStaff } from "../../auth";
import { UserDto, UserDtoRef } from "../models/UserDto";

interface UserRouteParams {
  userId: string;
}

export default {
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
        "sessionid": [],
      },
    ]
  },
  method: "GET",
  url: ":userId",
  preValidation: server?.auth ? [server.auth([checkIsLoggedIn, checkIsStaff])] : [],
  handler: async (req, res) => {
    const { userId } = req.params as UserRouteParams;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        email: true,
        userType: true,
        shippingAddress: true,
        billingAddress: true,
      },
    });

    if (!user) {
      return res.notFound("User not found");
    }

    return res.status(200).send(user);
  },
} satisfies RouteHandler;
