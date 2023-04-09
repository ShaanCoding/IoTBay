import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, RegisterSchema, UserSchema } from "../api/generated";





export default function useRegister() {
  const queryClient = useQueryClient();
  return useMutation<UserSchema, ApiError, RegisterSchema>({
    mutationFn: (data) => api.authentication.register(data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], data);
    }
  });
}
