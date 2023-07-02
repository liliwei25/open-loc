import Cookies from 'js-cookie';

import { CookieName } from '../../constants/cookieName.ts';
import { UserInfo } from '../../types/userInfo.ts';
import { getUserInfo } from '../auth/getUserInfo.ts';
import { isAuthorisedEmail } from '../auth/isAuthorisedEmail.ts';

export const authLoader = async (): Promise<UserInfo | null> => {
  const token = Cookies.get(CookieName.Token);
  if (!token) return null;
  try {
    const user = await getUserInfo(token);
    if (!isAuthorisedEmail(user.email)) {
      Cookies.set(CookieName.Token, '');
      return null;
    }
    return user;
  } catch (e) {
    Cookies.set(CookieName.Token, '');
    return null;
  }
};
