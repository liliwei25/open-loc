import { Affix, Center, Container, rem } from '@mantine/core';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { LocaleButton } from '../components/layout/LocaleButton.tsx';
import { CookieName } from '../constants/cookieName.ts';
import { RoutePath } from '../constants/routePath.ts';
import { useAuthContext } from '../contexts/authContext.ts';
import { getUserInfo } from '../utils/auth/getUserInfo.ts';
import { isAuthorisedEmail } from '../utils/auth/isAuthorisedEmail.ts';
import { notifyError } from '../utils/notification/notifyError.ts';

export function Login() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Center h="100%">
      <Container>
        <GoogleLogin
          onSuccess={async (response: CredentialResponse) => {
            try {
              const user = await getUserInfo(response.credential ?? '');
              if (!isAuthorisedEmail(user.email)) {
                notifyError({
                  title: 'authorisation.unauthorised.title',
                  message: 'authorisation.unauthorised.message',
                });
                return;
              }
              Cookies.set(CookieName.Token, response.credential ?? '');
              setUser(user);
              navigate(RoutePath.Dashboard);
            } catch (e) {
              console.error(e);
              notifyError({
                title: 'authorisation.generic.title',
                error: e,
                message: 'authorisation.generic.message',
              });
            }
          }}
          onError={() => {
            notifyError({
              title: 'authorisation.generic.title',
            });
          }}
        />
      </Container>
      <Affix position={{ top: rem(20), right: rem(20) }}>
        <LocaleButton />
      </Affix>
    </Center>
  );
}
