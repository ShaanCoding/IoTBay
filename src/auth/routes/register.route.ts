import { FastifyRoute } from "../..";
import argon2 from "argon2";
import prisma from "../../services/prisma";

const registerRoute = {
  method: "POST",
  url: "/auth/register",
  handler: async (req, res) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
      select: {
        username: true,
      },
    });

    return res.status(201).send({
      message: `Successfully created user: ${user.username}`,
    });
  },
} satisfies FastifyRoute;

export default registerRoute;
