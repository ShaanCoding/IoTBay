import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError } from "../api/generated";




export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError>({
    mutationFn: () => api.authentication.logout(),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], null);
      queryClient.invalidateQueries(["me"]);
    }
  });
}
