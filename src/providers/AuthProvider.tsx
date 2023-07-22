import Cookies from 'js-cookie';
import { PropsWithChildren, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { CookieName } from '../constants/cookieName.ts';
import { RoutePath } from '../constants/routePath.ts';
import { AuthContext } from '../contexts/authContext.ts';
import { UserInfo } from '../types/userInfo.ts';

export function AuthProvider({ children }: PropsWithChildren) {
  const data = useLoaderData();
  const [user, setUser] = useState<UserInfo | null>(data as UserInfo | null);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set(CookieName.Token, '');
    setUser(null);
    navigate(RoutePath.Login, { replace: true });
  };

  return (
    <AuthContext.Provider value={{ setUser, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
