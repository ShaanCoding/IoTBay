import {
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  TableContainer,
} from "@chakra-ui/react";
import StaffTable from "../components/StaffTable";
import { Link } from "react-router-dom";

export default function StaffManagement() {
  return (
    <Stack>
      <Stack textAlign={"center"}>
        <Heading size="lg">Staff Management</Heading>
        <Heading size="md">Welcome to the Staff Management!</Heading>
        <Heading>
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={400}
            color={"white"}
            bg={"gray.900"}
            to={"/CreateStaff"}
            _hover={{
              bg: "gray.700",
            }}
          >
            Create new user
          </Button>{" "}
        </Heading>
      </Stack>

      <Container maxW="container.xl">
        <TableContainer>
          <StaffTable />
        </TableContainer>
      </Container>
    </Stack>
  );
}
