import { Affix, Button, Center, Container, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { LocaleButton } from '../components/layout/LocaleButton.tsx';
import { useAuthContext } from '../contexts/authContext.ts';

export function Login() {
  const { login } = useAuthContext();
  const { t } = useTranslation('login');

  return (
    <Center h="100%">
      <Container>
        <Button onClick={() => login()}>{t('loginViaGoogle')}</Button>
      </Container>
      <Affix position={{ top: rem(20), right: rem(20) }}>
        <LocaleButton />
      </Affix>
    </Center>
  );
}
