import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import api from "../services/api";
import { ApiError, UserDto } from "../api/generated";

/**
 * This loader is used to fetch the current user's profile data before the page is rendered.
 * @returns null
 */
const profileLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    if (!queryClient.getQueryData(["me"])) {
        await queryClient.fetchQuery<UserDto, ApiError>({
            queryKey: ["me"],
            queryFn: () => api.users.getMe()
        })
    }

    return null
}

export default profileLoader;