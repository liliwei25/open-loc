import { AppShell } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';

import { DashboardHeader } from './DashboardHeader.tsx';
import { DashboardNavbar } from './DashboardNavbar.tsx';

export function DashboardLayout({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<DashboardNavbar hidden={!opened} />}
      header={
        <DashboardHeader isNavbarOpen={opened} setIsNavbarOpen={setOpened} />
      }
      sx={{ main: { transition: 'padding 1s' } }}
    >
      {children}
    </AppShell>
  );
}
