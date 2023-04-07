import { RegisterDto, RegisterDtoType } from "../models/RegisterDto";
import { UserDto } from "../../users/models/UserDto";
import prisma from "../../../services/prisma";
import argon2 from "argon2";
import { RouteHandler } from "../../..";

export default {
  schema: {
    body: RegisterDto,
    response: {
      201: UserDto,
    },
  },
  method: "POST",
  url: "register",
  handler: async (req, res) => {
    const { email, password, name, phone, address } = req.body as RegisterDtoType;
    const passwordHash = await argon2.hash(password);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.badRequest("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        phone,
        address,
      },
      select: {
        userId: true,
        email: true,
        userType: true,
        shippingAddress: true,
        billingAddress: true,
      },
    });

    return res.status(201).send(user);
  },
} satisfies RouteHandler;
