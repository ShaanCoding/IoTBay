import { useMutation } from "@tanstack/react-query";



const register = ({email, password}: RegisterArgs) =>
  fetch(`http://localhost:3000/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
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
