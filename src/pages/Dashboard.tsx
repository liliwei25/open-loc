import { FolderEditor } from '../components/dashboard/FolderEditor.tsx';
import { DashboardLayout } from '../components/layout/DashboardLayout.tsx';
import { useAuthContext } from '../contexts/authContext.ts';

export function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    return <></>;
  }

  return (
    <DashboardLayout>
      <FolderEditor />
    </DashboardLayout>
  );
}
