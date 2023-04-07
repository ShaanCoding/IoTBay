import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../utils/fetcher";


const login = ({username, password}: LoginArgs) =>
  fetcher(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
        "Content-Type": "application/json"
    }
  })

interface LoginArgs {
    username: string;
    password: string;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, LoginArgs>({
    mutationFn: login,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], data);
    }
  });
}
