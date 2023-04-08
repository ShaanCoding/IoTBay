import { FastifyRequest, FastifyReply } from 'fastify'

/**
 * Authentication function
 * This checks to see if the user is logged in
 */
const isLoggedIn = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    if (request.user) {
      done()
    } else {
      reply.forbidden("You are not logged in")
    }
  }

  export default isLoggedIn