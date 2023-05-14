import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import TableRow from "./TableRow";
import { RouterOutput } from "backend/src";

interface IProductTableProps {
  isLightMode: boolean;
  getProducts: {
    data: RouterOutput["products"]["products"];
  };
}

const ProductTable: React.FC<IProductTableProps> = ({
  isLightMode,
  getProducts,
}) => {
  return (
    <Box background={isLightMode ? "gray.100" : "gray.900"} padding={4}>
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
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
