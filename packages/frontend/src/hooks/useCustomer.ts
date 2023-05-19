import { trpcReact } from "../App";
import React from "react";

const customerKey = "customer";

// getMycustomer (currenty logged in)
export function useMyCustomer() {
  const context = trpcReact.useContext();
  return trpcReact.customer.myCustomer.useQuery();
}
// getCustomer (Get customer :/ customerId)
export function useGetCustomer(customerId: string) {
  return trpcReact.customer.customer.useQuery(customerId);
}

// getCustomers (GET for customers management by staffs) /
export function useGetCustomers({
  customerFilter
}: {
  customerFilter?: string;
}) {
  const { data, ...rest } = trpcReact.customer.customers.useQuery();

  const filteredData = React.useMemo(() => {
    if (customerFilter) {
      return data?.filter((customer) =>
        customer.userId.toLowerCase().includes(customerFilter.toLowerCase())
      ) || [];
    }
    return data || [];
  }, [data, customerFilter]);

  return {
    data: filteredData,
    ...rest,
  };
}

// deleteCustomer by userself (DELETE) /
export function useDeleteMyCustomer() {
  const context = trpcReact.useContext();

  return trpcReact.users.deleteMe.useMutation({
    onSuccess: () => {
      context.customer.customers.invalidate();
    },
  });
}

// deleteCustomer by staff (DELETE) 
export function useDeleteCustomer() {
  const context = trpcReact.useContext();

  return trpcReact.users.deleteUser.useMutation({
    onSuccess: () => {
      context.customer.customers.invalidate();
    },
  });
}

// deleteManyCustomer by staff (DELETE) 
/*export function useDeleteCustomers() {

  const context = trpcReact.useContext();

  return trpcReact.users.deleteMany.useMutation({
    onSuccess: () => {
      context.customer.customers.invalidate();
    }
  });
}*/

// editCustomer by customer-self (UPDATE) /
export function useEditMyCustomer() {
  const context = trpcReact.useContext();

  return trpcReact.customer.editMyCustomer.useMutation({
    onSuccess: () => {
      context.customer.customers.invalidate();
    }
  });
}

// editCustomers by staff (UPDATE) /
export function useEditCustomers() {
  const context = trpcReact.useContext();

  return trpcReact.customer.edit.useMutation({
    onSuccess: () => {
      context.customer.customers.invalidate();
    }
  });
}