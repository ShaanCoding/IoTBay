import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/Datatable";
import useUsers from "../hooks/useUsers";
import { RouterOutput } from "backend";

const columnHelper = createColumnHelper<RouterOutput["users"]["users"][0]>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("userType", {
    header: "Role",
  }),
];

export default function UserManagementTable() {
  const usersQuery = useUsers();

  return <DataTable columns={columns} data={usersQuery.data ?? []} />;
}
