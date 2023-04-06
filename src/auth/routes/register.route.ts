import { FastifyRoute } from "../..";
import argon2 from "argon2";
import prisma from "../../services/prisma";

const registerRoute = {
  method: "POST",
  url: "/auth/register",
  handler: async (req, res) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        isStaff: false,
      },
      select: {
        email: true,
      },
    });

    return res.status(201).send({
      message: `Successfully created user: ${user.email}`,
    });
  },
} satisfies FastifyRoute;

export default registerRoute;
