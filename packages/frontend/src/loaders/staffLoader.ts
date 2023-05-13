import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { trpcClient, trpcReact } from "../App";
import { getQueryKey } from "@trpc/react-query";

/**
 * This loader is used to fetch the current user's profile data before the page is rendered.
 * @returns null
 */
const staffLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {

    const queryKey = getQueryKey(trpcReact.users.me)

    if (!queryClient.getQueryData(queryKey)) {
      const result = await queryClient.fetchQuery({
        queryKey,
        queryFn: () => trpcClient.users.me.query(),
      });

      if (!result || result.userType !== "staff") {
        return redirect("/login");
      }
    }

    return null;
  };

export default staffLoader;
