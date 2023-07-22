import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

import { CookieName } from '../../constants/cookieName.ts';
import { RoutePath } from '../../constants/routePath.ts';
import { useAuthContext } from '../../contexts/authContext.ts';

export function ProtectedRoute() {
  const outlet = useOutlet();
  const token = Cookies.get(CookieName.Token);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !token) {
      navigate(RoutePath.Login);
    }
  }, [user, token, navigate]);

  return outlet;
}
