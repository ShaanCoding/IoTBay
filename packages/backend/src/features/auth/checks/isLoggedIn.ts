import { FastifyAuthFunction } from "@fastify/auth"

/**
 * Authentication function
 * This checks to see if the user is logged in
 */
const isLoggedIn: FastifyAuthFunction = async (request, reply, done) => {
    if (request.user) {
      done()
    } else {
      reply.forbidden("You are not logged in")
    }
  }

  export default isLoggedIn