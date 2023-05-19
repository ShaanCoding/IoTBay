import { Button, Container, Divider, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  return (
    <Container>
      <Stack spacing={4}>
        <Heading size="lg">Staff Dashboard</Heading>
        <Heading size="md">Welcome to the Staff Dashboard!</Heading>

        <Divider />

        <Button as={Link} to="/staff/inventory">
            Manage Inventory
        </Button>

        <Button as={Link} to="/staff/users">
            Manage Users
        </Button>

        <Button as={Link} to="/staff/customerDetail">
            Manage Customers Detail
        </Button>
        <Button as={Link} to="/staff/staff">
            Manage Staff
        </Button>
      </Stack>
    </Container>
  );
}
