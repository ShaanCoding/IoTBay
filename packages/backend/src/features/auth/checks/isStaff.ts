import { FastifyAuthFunction } from "@fastify/auth";

/**
 * Authentication function
 * This checks to see if the user is a staff member
 */
const isStaff: FastifyAuthFunction = async (request, reply, done) => {
  if (request.user && request.user.userType === "staff") {
    done();
  } else {
    reply.forbidden("You are not a staff member");
  }
};

export default isStaff;
