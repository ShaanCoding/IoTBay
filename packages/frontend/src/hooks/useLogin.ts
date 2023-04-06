import { useMutation } from "@tanstack/react-query";



const login = ({username, password}: LoginArgs) =>
  fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
        "Content-Type": "application/json"
    }
  }).then(res => res.json());

interface LoginArgs {
    username: string;
    password: string;
}

export default function useLogin() {
  return useMutation<unknown, unknown, LoginArgs>({
    mutationFn: login,
  });
}
