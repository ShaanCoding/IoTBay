import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { trpcReact } from "../../../App";
import React from "react";
import { StaffListSchema } from "backend/src/schema";

// grabs the staff data 
export default function useStaff () {
    return trpcReact.staff.staff.useQuery();
}
