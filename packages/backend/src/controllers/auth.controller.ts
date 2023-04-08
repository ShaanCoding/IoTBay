import { FastifyRequest, FastifyReply } from "fastify";
import argon2 from "argon2";
import prisma from "../services/prisma.service";
import { LoginSchemaType, RegisterSchemaType } from "../schema";

export const login = async (
  request: FastifyRequest<{ Body: LoginSchemaType }>,
  reply: FastifyReply
) => {
  const user = request.user;

  if (!user) {
    return reply.badRequest("Invalid credentials");
  }

  return reply.status(200).send(user);
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.logOut();
  return reply.status(200).send({ message: "Logged out" });
};

export const register = async (
  request: FastifyRequest<{ Body: RegisterSchemaType }>,
  reply: FastifyReply
) => {
  const { email, password, name, phone, address } = request.body;
  const passwordHash = await argon2.hash(password);

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return reply.badRequest("User already exists");
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

  request.session.set("passport", user.userId);

  return reply.status(201).send(user);
};
