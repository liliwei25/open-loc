import axios from 'axios';

import { UserInfo } from '../../types/userInfo.ts';

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  const response = await axios.get<UserInfo>(
    `https://www.googleapis.com/oauth2/v1/userinfo`,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    }
  );
  return response.data;
};
