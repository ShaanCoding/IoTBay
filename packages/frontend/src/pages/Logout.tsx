import { Container, Heading, useToast } from "@chakra-ui/react";
import useLogout from "../hooks/useLogout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const logoutMutation = useLogout();
    const navigate = useNavigate();
    const toast = useToast();

    const logout = async () => {
      await logoutMutation.mutateAsync();
      toast({
        title: "Logged out",
        description: "You have been logged out",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/`);
 }

    useEffect(() => {
        logout();
    }, [])

  return (
    <Container maxW="container.sm">
      <Heading>Logging out...</Heading>
    </Container>
  );
}
