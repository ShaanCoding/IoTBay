import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { trpcReact } from "../../../App";

export default function useUsers () {
    return trpcReact.users.users.useQuery();
}