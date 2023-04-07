import { checkIsLoggedIn } from "..";
import { RouteHandler } from "../../..";
import server from "../../../services/server";

export default {
  method: "POST",
  url: "logout",
  schema: {
    operationId: "logout",
    tags: ["Authentication"],
    security: [
      {
        "sessionid": [],
      },
    ]
  },
  handler: async (req, res) => {
    await req.logOut();
    return res.status(200).send({ message: "Logged out" });
  },
} satisfies RouteHandler;
