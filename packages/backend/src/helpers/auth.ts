import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Authentication function
 * This checks to see if the user is logged in
 */
export const isLoggedIn = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  if (request.user) {
    done();
  } else {
    reply.forbidden("You are not logged in");
  }
};

/**
 * Authentication function
 * This checks to see if the user is a staff member
 */
export const isStaff = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  if (request.user && request.user.userType === "staff") {
    done();
  } else {
    reply.forbidden("You are not a staff member");
  }
};
