import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { ApiError, UserDto } from "../api/generated";




const meQueryKey = ["me"];

export default function useMe() {
  return useQuery<UserDto, ApiError>({
    queryFn: () => api.users.getMe(),
    queryKey: meQueryKey,
  });
}
