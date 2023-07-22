import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { UserInfo } from '../types/userInfo.ts';

type AuthContextType = {
  setUser: Dispatch<SetStateAction<UserInfo | null>>;
  logout: () => void;
  user: UserInfo | null;
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
