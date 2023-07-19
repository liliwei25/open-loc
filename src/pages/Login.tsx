import { Button, Center, Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '../contexts/authContext.ts';

export function Login() {
  const { login } = useAuthContext();
  const { t } = useTranslation('login');

  return (
    <Center h="100%">
      <Container>
        <Button onClick={() => login()}>{t('loginViaGoogle')}</Button>
      </Container>
    </Center>
  );
}
