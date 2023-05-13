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
import { RouterOutput } from "backend";

interface IProductTableProps {
  isLightMode: boolean;
  getProducts: {
    data: RouterOutput["products"]["products"];
  };
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductTable: React.FC<IProductTableProps> = ({
  isLightMode,
  getProducts,
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
                  isChecked={selectedItems.length === getProducts.data.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(
                        getProducts.data.map((element) => element.productId)
                      );
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </Th>
              <Th textAlign="center">Image</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Stock</Th>
              <Th textAlign="center">Categories</Th>
              <Th textAlign="center">Last Updated (DD-MM-YYYY)</Th>
              <Th textAlign="center">Price ($)</Th>
              <Th textAlign="center">Operations</Th>
            </Tr>
          </Thead>

          <Tbody>
            {getProducts.data.length > 0 &&
              getProducts.data.map((element, index) => {
                return (
                  <TableRow
                    key={element.productId}
                    productId={element.productId}
                    name={element.name}
                    price={element.price}
                    stock={element.stock}
                    description={element.description}
                    image={element.image}
                    category={element.category}
                    lastUpdated={
                      element.lastUpdated ? new Date(element.lastUpdated) : null
                    }
                    isSelect={selectedItems.includes(element.productId)}
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

export default ProductTable;
