import { FastifyRequest, FastifyReply } from "fastify";
import argon2 from "argon2";
import prisma from "../services/prisma.service";
import { LoginSchemaType, RegisterSchemaType } from "../schema";

/**
 * Given the user successfully logged in, this function will return the user
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns User
 */
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

/**
 * If a user is logged in, this function will log them out
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns an object containing a message
 */
export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.logOut();
  return reply.status(200).send({ message: "Logged out" });
};

/**
 * Register a new user given their details
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns User and signs them in
 */
export const register = async (
  request: FastifyRequest<{ Body: RegisterSchemaType }>,
  reply: FastifyReply
) => {
  const { email, password, name, phone, address } = request.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return reply.badRequest("User already exists");
  }

  const passwordHash = await argon2.hash(password);

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
      name: true,
      userType: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  request.session.set("passport", user.userId);

  return reply.status(201).send(user);
};
