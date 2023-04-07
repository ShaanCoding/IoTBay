import { RouteHandler } from "../../..";

export default {
  method: "POST",
  url: "logout",
  handler: async (req, res) => {
    await req.logOut();
    return res.status(200).send({ message: "Logged out" });
  },
} satisfies RouteHandler;
