import { Center, Container } from '@mantine/core';

import { useAuthContext } from '../contexts/authContext.ts';

export function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    return <></>;
  }

  return (
    <Center>
      <Container>Welcome {user.name}!</Container>
    </Center>
  );
}
