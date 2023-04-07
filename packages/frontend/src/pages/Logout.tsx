import { Container, Heading } from "@chakra-ui/react";
import useLogout from "../hooks/useLogout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const logoutMutation = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(async () => {
            await logoutMutation.mutateAsync();
            navigate(`/`);
        }
        , 1000);
    }, [])

  return (
    <Container maxW="container.sm">
      <Heading>Logging out...</Heading>
    </Container>
  );
}
