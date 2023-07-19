import { notifications } from '@mantine/notifications';
import { useGoogleLogin } from '@react-oauth/google';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { CookieName } from '../constants/cookieName.ts';
import { RoutePath } from '../constants/routePath.ts';
import { AuthContext } from '../contexts/authContext.ts';
import { UserInfo } from '../types/userInfo.ts';
import { getUserInfo } from '../utils/auth/getUserInfo.ts';
import { isAuthorisedEmail } from '../utils/auth/isAuthorisedEmail.ts';

export function AuthProvider({ children }: PropsWithChildren) {
  const data = useLoaderData();
  const [user, setUser] = useState<UserInfo | null>(data as UserInfo | null);
  const navigate = useNavigate();
  const { t } = useTranslation('errors', { keyPrefix: 'authorisation' });

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const user = await getUserInfo(response.access_token);
        if (!isAuthorisedEmail(user.email)) {
          notifications.show({
            title: t('unauthorised.title'),
            message: t('unauthorised.message'),
          });
          return;
        }
        Cookies.set(CookieName.Token, response.access_token);
        setUser(user);
        navigate(RoutePath.Dashboard);
      } catch (e) {
        console.error(e);
        notifications.show({
          title: t('generic.title'),
          message: isAxiosError(e) ? e.message : t('generic.message'),
        });
      }
    },
    onError: (errorResponse) => {
      notifications.show({
        title: t('generic.title'),
        message: errorResponse.error,
      });
    },
  });

  const logout = () => {
    Cookies.set(CookieName.Token, '');
    setUser(null);
    navigate(RoutePath.Login, { replace: true });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
