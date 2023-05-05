import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { createColumnHelper } from "@tanstack/react-table";
import { UserSchema } from "../../../api/generated";

export default function useUsers () {
    return useQuery({
        queryFn: ({signal}) => {
            const request = api.users.getUsers();

            if (signal) {
                signal.addEventListener('abort', () => {
                    request.cancel();
                })
            }

            return request
        },
        queryKey: ['users']
    })
}