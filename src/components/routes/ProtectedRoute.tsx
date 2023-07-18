import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

import { RoutePath } from '../../constants/routePath.ts';
import { useAuthContext } from '../../contexts/authContext.ts';

export function ProtectedRoute() {
  const outlet = useOutlet();
  const { user, token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !token) {
      navigate(RoutePath.Login);
    }
  }, [user, token, navigate]);

  return outlet;
}
