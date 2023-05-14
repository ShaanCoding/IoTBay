import {
  Container,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetProducts } from "../../../hooks/useProducts";
import { useGetCategories } from "../../../hooks/useCategories";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import SearchAndFilterNavbar from "../../IoTDeviceCatalogue/components/SearchAndFilterNavbar";
import ProductTable from "../components/ProductTable";

export default function BrowseInventory() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  interface IFilter {
    searchFilter: string;
    categoryFilter: string[];
  }

  const [finalFilter, setFinalFilter] = React.useState<IFilter>({
    searchFilter: "",
    categoryFilter: [],
  });

  const getProducts = useGetProducts({
    searchFilter: finalFilter.searchFilter,
    categoryFilter: finalFilter.categoryFilter,
  });

  // Get categories
  const getCategories = useGetCategories();

  if (getProducts.isLoading || getCategories.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (getProducts.isError || getCategories.isError) {
    return (
      <Text>
        Error: {getProducts?.error?.message || getCategories?.error?.message}
      </Text>
    );
  }

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <PageTitle title="Browse Inventory"></PageTitle>

        <BreadCrumbRoute
          parameters={[{ paths: "Browse Inventory", links: "/browse" }]}
        />

        {/* Search & Filter */}
        <SearchAndFilterNavbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          setFinalFilter={setFinalFilter}
          getCategories={getCategories}
          getProducts={getProducts}
        />

        {/* Table */}
        <ProductTable
          getProducts={getProducts}
          isLightMode={useColorMode().colorMode === "light"}
        />
      </Stack>
    </Container>
  );
}
