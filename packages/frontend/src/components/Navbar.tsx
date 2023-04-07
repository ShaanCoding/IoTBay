// chakra ui navbar

import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useMe from "../hooks/useMe";

// Path: packages\frontend\src\components\Navbar.tsx

export default function Navbar() {

    const { data, isError } = useMe()

  return (
    <Box>
      <Flex
        bg="gray.800"
        color="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.700"
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"white"}
            as={Link}
            to="/"
          >
            IoTBay
          </Text>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
            {!data ? (
                <>
                    <Button
                        as={Link}
                        fontSize={"sm"}
                        fontWeight={400}
                        variant={"link"}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        as={Link}
                        display={{ base: "none", md: "inline-flex" }}
                        fontSize={"sm"}
                        fontWeight={600}
                        color={"white"}
                        bg={"gray.900"}
                        to={"/register"}
                        _hover={{
                            bg: "gray.700",
                        }}
                    >
                        Register
                    </Button>
                    </>
            ): (
                <>
                    <Button
                        as={Link}
                        fontSize={"sm"}
                        fontWeight={400}
                        variant={"link"}
                        to="/profile"
                    >
                        Profile
                    </Button>
                    <Button
                        as={Link}
                        fontSize={"sm"}
                        fontWeight={400}
                        variant={"link"}
                        to="/logout"
                    >
                        Logout
                    </Button>
                </>
            )}
          <Button
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            to="/login"
          >
            Docs
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
