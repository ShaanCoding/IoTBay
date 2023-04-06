import { useState } from "react";
import { ButtonGroup, Container, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={navigateLogin}>Login</Button>
      </ButtonGroup>
    </Container>
  );
}
