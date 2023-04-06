import { FastifyRoute } from "../..";
import fastifyPassport from "@fastify/passport";
import { LoginDto } from "../dto/LoginDto";

const loginRoute = {
  method: "POST",
  url: "/auth/login",
  preValidation: [
    fastifyPassport.authenticate("local", {
      authInfo: false,
      session: true,
    }),
  ],
  schema: {
    body: LoginDto,
  },
  handler: (req, res) => {
    return res.status(200).send({
      message: "Logged in",
    });
  },
} satisfies FastifyRoute;

export default loginRoute;