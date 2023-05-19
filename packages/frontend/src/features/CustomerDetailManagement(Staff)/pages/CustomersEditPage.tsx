import { useNavigate, useParams } from "react-router-dom";
import EditCustomerDetail, {
  FormValues,
} from "../components/EditCustomersDetail";
import { useEditCustomers, useGetCustomer } from "../../../hooks/useCustomer";
import { useToast } from "@chakra-ui/react";
import { RouterInput } from "backend/src";
import { isTRPCClientError } from "../../../utils/trpc";

export default function EditCustomer() {
  const customerId: string = useParams().id as string;
  const getCustomer = useGetCustomer(customerId);

  if (getCustomer.isLoading || !getCustomer.data) {
    return <div>Loading...</div>;
  }

  return (
    <EditCustomerDetail
      initialCustomer={getCustomer.data}
    />
  );
}
