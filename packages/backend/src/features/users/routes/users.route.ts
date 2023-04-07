import { RouteHandler } from "../../..";
import prisma from "../../../services/prisma";
import server from "../../../services/server";
import { checkIsLoggedIn, checkIsStaff } from "../../auth";
import { UserCollectionDto } from "../models/UserCollection";

export default {
  schema: {
    response: {
      200: UserCollectionDto,
    },
  },
  method: "GET",
  url: "",
  preValidation: [
    server.auth([checkIsLoggedIn, checkIsStaff], {
      relation: "and",
    }),
  ],
  handler: async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        email: true,
        userType: true,
        shippingAddress: true,
        billingAddress: true,
      },
    });

    return res.status(200).send(users);
  },
} satisfies RouteHandler;
