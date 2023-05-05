// chakra ui navbar

import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useMe from "../hooks/useMe";
import logo from "../assets/icon.svg";
import { UserSchema } from "../api/generated";

// Path: packages\frontend\src\components\Navbar.tsx

export default function Navbar() {
  const { data, isError } = useMe();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems={"center"}
        >
          <Link to="/">
            <Stack
              // flex={{ base: 1 }}
              // justify={{ base: "center", md: "start" }}
              // alignItems={"center"}
              direction={"row"}
              spacing={4}
              alignItems={"center"}
            >
              {/* Image */}
              <Image
                src={logo}
                alt="react"
                width="50px"
                height="50px"
                // link
              />
              <Text
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                fontWeight={"semibold"}
              >
                IoTBay -{" "}
                {data?.userType === UserSchema.userType.STAFF
                  ? "Staff"
                  : "Customer"}
              </Text>
            </Stack>
          </Link>
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
          ) : (
            <>
              {data.userType === UserSchema.userType.STAFF ? (
                <Button as={Link} to="/staff" variant={"link"}>
                  Staff Dashboard
                </Button>
              ) : null}
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
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href="/docs"
          >
            Docs
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
