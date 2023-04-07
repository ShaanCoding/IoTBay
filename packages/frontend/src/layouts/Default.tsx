import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
 return <Flex h="full" flexDir={"column"}>
    <Navbar />
    <Box flex="1">
      <Outlet />
    </Box>
  </Flex>;
}
