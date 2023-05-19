import {
  Container,
  Stack,
  Text,
  Button,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {  useDeleteCustomer, useGetCustomers } from "../../../hooks/useCustomer";
import { Link } from "react-router-dom";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import SearchNavbar from "../components/SearchNavbar";
import CustomerTable from "../components/CustomersDetailTable";
import { isTRPCClientError } from "../../../utils/trpc";

export default function ManageCustomers() {
  const toast = useToast();

  const [search, setSearch] = useState("");

  interface IFilter {
    searchFilter: string;
  }

  const [finalFilter, setFinalFilter] = React.useState<IFilter>({
    searchFilter: ""
  });

  const getCustomer = useGetCustomers({
    customerFilter: finalFilter.searchFilter,
  });

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);


  if (getCustomer.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (getCustomer.isError) {
    return (
      <Text>
        Error: {getCustomer?.error?.message}
      </Text>
    );
  }

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        <PageTitle title="Manage Customers Detail">
        </PageTitle>
        <BreadCrumbRoute
          parameters={[
            { paths: "Manage Customers Detail", links: "/staff/customerDetail" },
          ]}
        />
        <SearchNavbar
          search={search}
          setSearch={setSearch}
          setFinalFilter={setFinalFilter}
          getCustomers={getCustomer}
        />
        <CustomerTable
          getCustomers={getCustomer}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          isLightMode={useColorMode().colorMode === "light"}
        />
      </Stack>
    </Container>
  );
}