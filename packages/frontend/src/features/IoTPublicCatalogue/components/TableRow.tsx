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
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { convertToDDMMYYYY } from "../../../utils/dateFormatter";
import { convertToCurrency } from "../../../utils/currencyFormatter";
import { generateCategoryColor } from "../../../utils/generateCategoryColor";

const TableRow: React.FC<{
  productId: string;
  image: string;
  name: string;
  description: string;
  stock: number;
  category: string | null;
  lastUpdated: Date | null;
  price: number;
}> = (props) => {
  return (
    <Tr>
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
        {props.category ? (
          <HStack spacing={2} align="center" justify="flex-start">
            <Tag
              variant="solid"
              style={{ backgroundColor: generateCategoryColor(props.category) }}
              key={props.category}
            >
              {props.category}
            </Tag>
          </HStack>
        ) : null}
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
            colorScheme="green"
            size="sm"
            width="100%"
            leftIcon={<AddIcon />}
            as={Link}
            //  Look at how we do actions in IotDeviceCatalogue
          >
            Add to Cart
          </Button>
        </Stack>
      </Td>
    </Tr>
  );
};

export default TableRow;
