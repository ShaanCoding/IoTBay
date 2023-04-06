import { FastifyRoute } from "../..";
// import createError from "@fastify/error";
// const NoUserError = createError("NoUserError", "No user found", 404);

export const meRoute: FastifyRoute = {
  method: "GET",
  url: "/users/me",
  preValidation: [],
  schema: {},
  handler: (req, res) => {
    // console.log(req.cookies)
    if (!req.user) throw new Error("No user found");

    return req.user;
  },
};
