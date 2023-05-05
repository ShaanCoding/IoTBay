import React from "react";

import {
  Tr,
  Text,
  Box,
  Stack,
  Button,
  Td,
  Tag,
  Badge,
  Checkbox,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useDeleteProduct } from "../../../hooks/useProducts";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { convertToDDMMYYYY } from "../../../utils/dateFormatter";
import { convertToCurrency } from "../../../utils/currencyFormatter";
import { ApiError } from "../../../api/generated";
import { generateCategoryColor } from "../../../utils/generateCategoryColor";

const TableRow: React.FC<{
  productId: string;
  image: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  lastUpdated: Date | null;
  price: number;
  isSelect: boolean;
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
}> = (props) => {
  const toast = useToast();
  const deleteProduct = useDeleteProduct();

  return (
    <Tr>
      <Td>
        <Checkbox
          isChecked={props.isSelect}
          onChange={(e) => {
            if (!props.setSelectedItems) return;

            if (e.target.checked) {
              props.setSelectedItems((prev) => [...prev, props.productId]);
            } else {
              props.setSelectedItems((prev) =>
                prev.filter((element) => element !== props.productId)
              );
            }
          }}
        ></Checkbox>
      </Td>
      <Td>
        <HStack spacing={4} align="center" justify="center">
          {/* Image */}
          {props.image && (
            <img src={props.image} alt="Product Image" width="150px" />
          )}
        </HStack>
      </Td>
      <Td>
        <Text fontSize="2xl" paddingBottom={2}>
          {props.name}
        </Text>
        <Text fontSize="sm">{props.description}</Text>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl" paddingBottom={2}>
            {props.stock ? props.stock : 0}
          </Text>
          <Text fontSize="sm">In Stock</Text>
        </Box>
      </Td>
      <Td>
        {/* Tags */}
        <HStack spacing={2} align="center" justify="flex-start">
          <Tag
            variant="solid"
            style={{ backgroundColor: generateCategoryColor(props.category) }}
            key={props.category}
          >
            {props.category}
          </Tag>
        </HStack>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl" paddingBottom={2}>
            {props.lastUpdated ? convertToDDMMYYYY(props.lastUpdated) : "N/A"}
          </Text>
          <Badge colorScheme="green">LAST UPDATED</Badge>
        </Box>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">
            {props.price ? convertToCurrency(props.price) : "N/A"}
          </Text>
        </Box>
      </Td>
      <Td>
        <Stack spacing={2}>
          <Button
            colorScheme="yellow"
            size="sm"
            width="100%"
            leftIcon={<EditIcon />}
            as={Link}
            to={{
              pathname: `/staff/inventory/edit/${props.productId}`,
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            width="100%"
            leftIcon={<DeleteIcon />}
            onClick={async () => {
              try {
                deleteProduct.mutateAsync(props.productId);

                toast({
                  title: "Product Deleted",
                  description: "Product has been deleted.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } catch (error) {
                if (error instanceof ApiError) {
                  toast({
                    title: "Product deletion failed",
                    description: error.body?.message ?? "Unknown error",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Product deletion failed",
                    description: "Unknown error",
                    status: "error",
                    duration: 5000,
                  });
                }
              }
            }}
          >
            Delete
          </Button>
        </Stack>
      </Td>
    </Tr>
  );
};

export default TableRow;
