import {
  Container,
  Divider,
  Heading,
  Stack,
  TableContainer,
} from "@chakra-ui/react";
import UserManagementTable from "../components/UsersManagementTable";

export default function UserManagement() {
  return (
    <Stack>
      <Container>
        <Stack textAlign={"center"}>
          <Heading size="lg">User Management</Heading>
          <Heading size="md">Welcome to the User Management!</Heading>
        </Stack>
      </Container>

      <Container maxW="container.xl">
        <TableContainer>
          <UserManagementTable />
        </TableContainer>
      </Container>
    </Stack>
  );
}
