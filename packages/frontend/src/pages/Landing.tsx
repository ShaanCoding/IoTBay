import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useMe from "../hooks/useMe";

export default function Landing() {
  const { data, isLoading } = useMe();

  return (
    <Container h="100%">
      <Stack h="100%" py={6} spacing={6} align="center">
        <Heading as="h1" textAlign={"center"}>
          Welcome to IOTBay
        </Heading>
        {!data ? (
          <ButtonGroup spacing={2}>
            <Button as={Link} to="/login">
              Login
            </Button>
            <Button as={Link} to="/register">
              Register
            </Button>
          </ButtonGroup>
        ) : 
            <Text textAlign={"center"} fontSize={"3xl"}>
                Welcome, {data.email}
            </Text>
        }
      </Stack>
    </Container>
  );
}
