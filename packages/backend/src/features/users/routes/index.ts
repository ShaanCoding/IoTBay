import { RouteHandler } from "../../..";
import meRoute from "./me.route";
import userRoute from "./user.route";
import usersRoute from "./users.route";

export default [
    meRoute,
    userRoute,
    usersRoute
] satisfies RouteHandler[];