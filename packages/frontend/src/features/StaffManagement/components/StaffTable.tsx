import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/Datatable";
import useStaff from "../hooks/useStaff";
import { RouterOutput } from "backend/src";
import { useState } from "react";
import { Input, Stack } from "@chakra-ui/react";
import DeleteUserButton from "./DeleteStaff";
// this is where the table will grab the information from 
const columnHelper = createColumnHelper<RouterOutput["staff"]["staff"][0]>();

// creates the table using tanStack
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    
  }),
  // Makes a table with the column for Email
  // enableGlobalFilter tells the filter to not search this column
  columnHelper.accessor("email", {
    header: "Email",
    enableGlobalFilter: false 
  }),
  columnHelper.accessor("staffDetails.position", {
    header: "position",
    
  }),
  columnHelper.accessor("address", {
    header: "address",
    enableGlobalFilter: false 
  }),
  columnHelper.display( {
    header: "Delete",
    id: "delete",
    cell: (row) => <DeleteUserButton userId={row.row.original.userId}>
      Delete
    </DeleteUserButton>})
    
];



export default function StaffManagementTable() {
  const usersQuery = useStaff();
  const [search, setSearch] = useState("");

  return <Stack spacing={2}>
    <Input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
  <DataTable columns={columns} data={usersQuery.data ?? []} globalFilter={search} setGlobalFilter={setSearch}/>
  </Stack>;
}
