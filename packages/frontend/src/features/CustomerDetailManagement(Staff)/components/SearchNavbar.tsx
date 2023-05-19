import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { RouterOutput } from "backend/src";

interface IProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFinalFilter: React.Dispatch<
    React.SetStateAction<{
      searchFilter: string;
    }>
  >;

  getCustomers: {
    isLoading: boolean;
    data: RouterOutput["customer"]["customers"];
  };
}

const SearchNavbar: React.FC<IProps> = ({
  search,
  setSearch,
  setFinalFilter,
  getCustomers
}) => {
  return (
    <Box>
      <HStack spacing={2} align="center" justify="space-between">
        <InputGroup width="60%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search for customer"
            variant="filled"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </InputGroup>
        <Button
          colorScheme="green"
          leftIcon={<SearchIcon />}
          onClick={() => {
            setFinalFilter({
              searchFilter: search,
            });
          }}
        >
          Search
        </Button>
        <Button
          colorScheme="yellow"
          leftIcon={<CloseIcon />}
          onClick={() => {
            setSearch("");
            setFinalFilter({
              searchFilter: ""
            });
          }}
        >
          Clear
        </Button>
      </HStack>

      {getCustomers.data && (
        <Box style={{ marginTop: "1rem" }}>
          <Text fontSize="2xl">
            {JSON.stringify(getCustomers.data.length)} Customers Found
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SearchNavbar;