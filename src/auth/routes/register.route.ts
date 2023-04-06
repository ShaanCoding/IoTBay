import { FastifyRoute } from "../..";
import argon2 from "argon2";
import prisma from "../../services/prisma";
import { LoginDto, LoginDtoType } from "../dtos/LoginDto";
import { RegisterDto, RegisterDtoType } from "../dtos/RegisterDto";

const registerRoute = {
  schema: RegisterDto,
  method: "POST",
  url: "/auth/register",
  handler: async (req, res) => {
    try {
      
   
    if (!req.body) return res.status(400).send({ message: "Bad request" })
    const { email, password } = JSON.parse(req.body as string) as RegisterDtoType
    console.log(email, password)
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
  } catch (error) {
    console.log(error)
  }
  },
} satisfies FastifyRoute;

export default registerRoute;
