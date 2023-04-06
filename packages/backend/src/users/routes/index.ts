import { FastifyRoute } from "../..";
import { meRoute } from "./me.route";

export const usersRoutes = [
    meRoute
] as FastifyRoute[];