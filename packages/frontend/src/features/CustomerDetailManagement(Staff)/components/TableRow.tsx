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
import { useDeleteCustomer } from "../../../hooks/useCustomer";
import { CustomerDetails } from "@prisma/client";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";;
import { generateCategoryColor } from "../../../utils/generateCategoryColor";
import { isTRPCClientError } from "../../../utils/trpc";

const TableRow: React.FC<{
  userId: string;
  sex: string;
  isAnonymous: boolean;
  isSelect: boolean;
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
}> = (props) => {
  const toast = useToast();
  const deleteCustomer = useDeleteCustomer();
  
  return (
    <Tr>
      <Td>
        <Checkbox
          isChecked={props.isSelect}
          onChange={(e) => {
            if (!props.setSelectedItems) return;

            if (e.target.checked) {
              props.setSelectedItems((prev) => [...prev, props.userId]);
            } else {
              props.setSelectedItems((prev) =>
                prev.filter((element) => element !== props.userId)
              );
            }
          }}
        ></Checkbox>
      </Td>
      <Td>
        <Text fontSize="sm" >{props.userId}
        </Text>
      </Td>
      <Td>
          <Tag
            variant="solid"
            style={{ backgroundColor: generateCategoryColor(props.sex) }}
            key={props.sex}
          >
            {props.sex}
          </Tag>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">{String(props.isAnonymous)}
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
              pathname: `/staff/customerDetail/edit/${props.userId}`,
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
                deleteCustomer.mutateAsync(props.userId);

                toast({
                  title: "Customer Deleted",
                  description: "Customer has been deleted.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } catch (error) {
                if (isTRPCClientError(error)) {
                  toast({
                    title: "Customer deletion failed",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                  });
                } else {
                  toast({
                    title: "Customer deletion failed",
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