import prisma from "../services/prisma";

import { FastifyRequest, FastifyReply } from "fastify";

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

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user) {
    return reply.status(204).send(null);
  }

  const { user } = request;

  return reply.status(200).send(user);
};
