import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, UserSchema } from "../api/generated";




const meQueryKey = ["me"];

export default function useMe() {
  return useQuery<UserSchema, ApiError>({
    queryFn: () => api.users.getMe(),
    queryKey: meQueryKey,
  });
}
