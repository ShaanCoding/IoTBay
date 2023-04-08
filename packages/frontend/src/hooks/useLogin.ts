import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, LoginDto, UserDto } from "../api/generated";


export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<UserDto, ApiError, LoginDto>({
    mutationFn: (data) => api.authentication.login(data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], data);
    }
  });
}
