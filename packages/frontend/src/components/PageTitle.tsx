import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const PageTitle: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Box>
      <HStack spacing={2} align="center" justify="space-between">
        <Heading>{title}</Heading>
        {children && (
          <HStack spacing={2} align="center" justify="flex-end">
            {children}
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default PageTitle;
