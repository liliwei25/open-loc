import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

import { RoutePath } from '../../constants/routePath.ts';
import { useAuthContext } from '../../contexts/authContext.ts';

export function UnprotectedRoute() {
  const outlet = useOutlet();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(RoutePath.Dashboard);
    }
  }, [user, navigate]);

  return outlet;
}
