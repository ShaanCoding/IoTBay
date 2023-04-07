import { useMutation } from "@tanstack/react-query";
import fetcher from "../utils/fetcher";



const register = ({email, password}: RegisterArgs) =>
  fetcher(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  })

interface RegisterArgs {
    email: string;
    password: string;
}

export default function useRegister() {
  return useMutation<unknown, unknown, RegisterArgs>({
    mutationFn: register,
  });
}
