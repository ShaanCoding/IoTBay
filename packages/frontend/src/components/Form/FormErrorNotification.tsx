import { InfoIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Stack,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

interface FormErrorNotificationProps {
  errors: FieldErrors<FieldValues>;
}

const MapKeyToMessage = (key: string) => {
  switch (key) {
    case "name":
      return "Name";
    case "image":
      return "Image";
    case "stock":
      return "Stock";
    case "price":
      return "Price";
    case "category":
      return "Category";
    case "description":
      return "Description";
    default:
      return "Unknown";
  }
};

const FormErrorNotification: React.FC<FormErrorNotificationProps> = ({
  errors,
}) => {
  return Object.keys(errors).length > 0 ? (
    <Box
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={"red.400"}
      borderStyle={"solid"}
      padding={4}
      marginBottom={4}
    >
      <Stack spacing={2}>
        {/* Header with icon */}
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <InfoIcon
            // color={"red.400"}
            marginRight={4}
            height="25px"
            width="25px"
          />
          <Heading as="h4" size="lg">
            Invalid Form
          </Heading>
        </Flex>

        <Heading as="h6" size="sm">
          Please fix the following errors:
        </Heading>

        <Box>
          <UnorderedList>
            {Object.keys(errors).map((key) => {
              const error = errors[key] as FieldError;
              //   Check if empty object
              if (error) {
                return (
                  <ListItem key={key} style={{ marginLeft: "20px" }}>
                    <Text>{MapKeyToMessage(key)}</Text>
                    <UnorderedList>
                      <ListItem key={key}>
                        <Text>{error.message}</Text>
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                );
              }
            })}
          </UnorderedList>
        </Box>
      </Stack>
    </Box>
  ) : null;
};

export default FormErrorNotification;
