import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/Datatable";
import useUsers from "../hooks/useUsers";
import { RouterOutput } from "backend/src";
import PromoteUserButton from "./PromoteUser";
import DemoteUserButton from "./DemoteUser";


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
  columnHelper.display( {
    header: "Promote",
    id: "promote",
    cell: (row) => <PromoteUserButton userId={row.row.original.userId}>
      Promote
    </PromoteUserButton>}),

  columnHelper.display( {
    header: "Demote",
    id: "demote",
    cell: (row) => <DemoteUserButton userId={row.row.original.userId}>
      Demote
    </DemoteUserButton>})
    
];

export default function UserManagementTable() {
  const usersQuery = useUsers();

  return <DataTable columns={columns} data={usersQuery.data ?? []} />;
}
