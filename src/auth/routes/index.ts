import { FastifyRoute } from "../..";
import loginRoute from "./login.route";
import registerRoute from "./register.route";

export const authRoutes = [
  loginRoute,
  registerRoute
] satisfies FastifyRoute[];
