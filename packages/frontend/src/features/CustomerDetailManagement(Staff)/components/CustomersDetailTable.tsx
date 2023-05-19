import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Checkbox,
} from "@chakra-ui/react";
import TableRow from "./TableRow";
import { RouterOutput } from "backend/src";

interface ICustomerTableProps {
  isLightMode: boolean;
  getCustomers: {
    data: RouterOutput["customer"]["customers"];
  };
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;  
}

const CustomerTable: React.FC<ICustomerTableProps> = ({
  isLightMode,
  getCustomers,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <Box background={isLightMode ? "gray.100" : "gray.900"} padding={4}>
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th textAlign="center">
                <Checkbox
                  isChecked={selectedItems.length === getCustomers.data.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(
                        getCustomers.data.map((element) => element.userId)
                      );
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </Th>
              <Th textAlign="center">CustomerID</Th>
              <Th textAlign="center">Gender</Th>
              <Th textAlign="center">IsAnonymous</Th>
              <Th textAlign="center">Operations</Th>
            </Tr>
          </Thead>

          <Tbody>
            {getCustomers.data.length > 0 &&
              getCustomers.data.map((element, index) => {
                return (
                  <TableRow
                    key={element.userId}
                    userId={element.userId}
                    sex={element.sex ?? "Unknown"}
                    isAnonymous={element.isAnonymous}
                    isSelect={selectedItems.includes(element.userId)}
                    setSelectedItems={setSelectedItems}
                  />
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerTable;


