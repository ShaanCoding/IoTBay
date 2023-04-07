import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../utils/fetcher";


const logout = () =>
  fetcher(`/api/auth/logout`, {
    method: "POST",
  })



export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["me"], null);
      queryClient.invalidateQueries(["me"]);
    }
  });
}
