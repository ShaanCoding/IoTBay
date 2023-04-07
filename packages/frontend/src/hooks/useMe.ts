import { useQuery } from "@tanstack/react-query";
import fetcher from "../utils/fetcher";


const getMe = () =>
  fetcher(`/api/auth/user`, {
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    }
  })

const meQueryKey = ["me"];

export default function useMe() {
  return useQuery({
    queryFn: getMe,
    queryKey: meQueryKey,
  });
}
