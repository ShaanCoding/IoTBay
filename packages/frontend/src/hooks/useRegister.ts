import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, RegisterDto, UserDto } from "../api/generated";





export default function useRegister() {
  const queryClient = useQueryClient();
  return useMutation<UserDto, ApiError, RegisterDto>({
    mutationFn: (data) => api.authentication.register(data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], data);
    }
  });
}
