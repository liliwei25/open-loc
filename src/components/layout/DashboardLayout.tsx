import { AppShell, Group, Header, useMantineColorScheme } from '@mantine/core';
import { PropsWithChildren } from 'react';

import { ColorSchemeButton } from './ColorSchemeButton.tsx';
import { FullLogo } from './FullLogo.tsx';
import { LocaleButton } from './LocaleButton.tsx';
import { UserMenu } from './UserMenu.tsx';

export function DashboardLayout({ children }: PropsWithChildren) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      header={
        <Header height="60px" p="md">
          <Group align="center" position="apart">
            <FullLogo colorScheme={colorScheme} />
            <Group spacing="xs">
              <ColorSchemeButton />
              <LocaleButton />
              <UserMenu />
            </Group>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
