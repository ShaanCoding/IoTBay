import { RouteHandler } from "../../..";
import loginRoute from "./login.route";
import logoutRoute from "./logout.route";
import registerRoute from "./register.route";

export default [
    loginRoute,
    registerRoute,
    logoutRoute
] satisfies RouteHandler[];
