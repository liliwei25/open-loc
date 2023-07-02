import { useOutlet } from 'react-router-dom';

import { AuthProvider } from '../../providers/AuthProvider.tsx';

export function AuthLayout() {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
}
