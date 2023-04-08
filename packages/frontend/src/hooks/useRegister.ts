import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, RegisterDto, UserDto } from "../api/generated";





export default function useRegister() {
  return useMutation<UserDto, ApiError, RegisterDto>({
    mutationFn: (data) => api.authentication.register(data),
  });
}
