import prisma from "../services/prisma.service";

import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Get all users (admin only)
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns All users
 */
export const users = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      email: true,
      name: true,
      userType: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  return reply.status(200).send(users);
};

interface UserRouteParams {
  userId: string;
}

/**
 * Get a user by their userId
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns The user with the given userId
 */
export const user = async (
  request: FastifyRequest<{ Params: UserRouteParams }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;

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
    return reply.notFound("User not found");
  }

  return reply.status(200).send(user);
};

/**
 * If a user is logged in, this function will return their details
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns The currently logged in user or 204 if no user is logged in
 */
export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user) {
    return reply.status(204).send();
  }

  const { user } = request;

  return reply.status(200).send(user);
};
