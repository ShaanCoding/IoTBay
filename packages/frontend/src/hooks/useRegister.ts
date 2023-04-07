import { useMutation } from "@tanstack/react-query";



const register = ({email, password}: RegisterArgs) =>
  fetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.json());

interface RegisterArgs {
    email: string;
    password: string;
}

export default function useRegister() {
  return useMutation<unknown, unknown, RegisterArgs>({
    mutationFn: register,
  });
}
