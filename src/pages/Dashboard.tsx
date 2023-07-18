import { DashboardLayout } from '../components/layout/DashboardLayout.tsx';
import { useAuthContext } from '../contexts/authContext.ts';

export function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    return <></>;
  }

  return <DashboardLayout>{/* TODO: create dashboard */}</DashboardLayout>;
}
