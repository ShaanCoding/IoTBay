import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface CreateEditCancelButtonsProps {
  createOrUpdate: "create" | "edit";
}

const CreateEditCancelButtons: React.FC<CreateEditCancelButtonsProps> = ({
  createOrUpdate,
}) => {
  return (
    <Box>
      <HStack spacing={2} align="center" justify="flex-end">
        {createOrUpdate === "create" ? (
          <Button
            colorScheme="green"
            size="lg"
            leftIcon={<AddIcon />}
            type="submit"
          >
            Create Product
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            size="lg"
            leftIcon={<AddIcon />}
            type="submit"
          >
            Update Product
          </Button>
        )}
        <Button
          colorScheme="red"
          variant={"outline"}
          size="lg"
          leftIcon={<CloseIcon />}
          as={Link}
          to="/staff/inventory/manage"
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default CreateEditCancelButtons;
