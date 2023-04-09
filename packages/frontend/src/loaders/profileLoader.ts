import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import api from "../services/api";
import { ApiError, UserSchema } from "../api/generated";

/**
 * This loader is used to fetch the current user's profile data before the page is rendered.
 * @returns null
 */
const profileLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    if (!queryClient.getQueryData(["me"])) {
        const result = await queryClient.fetchQuery<UserSchema | undefined, ApiError>({
            queryKey: ["me"],
            queryFn: () => api.users.getMe()
        })

        if (!result) {
            return redirect("/login")
        }
    }

    return null
}

export default profileLoader;