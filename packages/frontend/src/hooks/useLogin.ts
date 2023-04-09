import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, LoginSchema, UserSchema } from "../api/generated";


export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<UserSchema, ApiError, LoginSchema>({
    mutationFn: (data) => api.authentication.login(data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], data);
    }
  });
}
