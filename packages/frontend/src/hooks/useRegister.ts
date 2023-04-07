import { useMutation } from "@tanstack/react-query";
import fetcher from "../utils/fetcher";



const register = (data: RegisterData) =>
  fetcher(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })

  interface RegisterData {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  }

export default function useRegister() {
  return useMutation<unknown, unknown, RegisterData>({
    mutationFn: register,
  });
}
