import { createContext, useContext } from 'react';

import { UserInfo } from '../types/userInfo.ts';

type AuthContextType = {
  login: () => void;
  logout: () => void;
  user: UserInfo | null;
  token?: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Auth context not available');
  }

  return authContext;
};
