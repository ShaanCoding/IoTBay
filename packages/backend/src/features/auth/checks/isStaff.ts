import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Authentication function
 * This checks to see if the user is a staff member
 */
const isStaff = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
  if (request.user && request.user.userType === "staff") {
    done();
  } else {
    reply.forbidden("You are not a staff member");
  }
};

export default isStaff;
