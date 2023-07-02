import { Button, Center, Container } from '@mantine/core';

import { useAuthContext } from '../contexts/authContext.ts';

export function Login() {
  const { login } = useAuthContext();

  return (
    <Center h="100%">
      <Container>
        <Button onClick={() => login()}>Login via Google</Button>
      </Container>
    </Center>
  );
}
