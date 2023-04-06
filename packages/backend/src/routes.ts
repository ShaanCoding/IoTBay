import { FastifyRoute } from ".";
import { authRoutes } from "./auth/routes";
import { usersRoutes } from "./users/routes";

export default [...authRoutes, ...usersRoutes] satisfies FastifyRoute[];
