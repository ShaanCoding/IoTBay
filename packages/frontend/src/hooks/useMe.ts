import { useQuery } from "@tanstack/react-query";


const getMe = () =>
  fetch(`/api/auth/user`, {
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    }
  }).then((res) => res.json());

const meQueryKey = ["me"];

export default function useMe() {
  return useQuery({
    queryFn: getMe,
    queryKey: meQueryKey,
  });
}
