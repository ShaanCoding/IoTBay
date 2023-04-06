import { Code, Container } from "@chakra-ui/react";
import useMe from "../hooks/useMe";

export default function Profile() {
  const { data: me } = useMe();

  return (
    <Container maxW={"container.sm"}>
      <Code>
        <pre>{JSON.stringify(me, null, 2)}</pre>
      </Code>
    </Container>
  );
}
