import {
  Burger,
  Group,
  Header,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';

import { FullLogo } from './FullLogo.tsx';
import { MenuActions } from './MenuActions.tsx';

type DashboardHeaderProps = {
  isNavbarOpen: boolean;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardHeader({
  isNavbarOpen,
  setIsNavbarOpen,
}: DashboardHeaderProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  if (!isSmallScreen) {
    return <></>;
  }

  return (
    <Header height="60px" p="md">
      <Group align="center" position="apart">
        <Burger
          opened={isNavbarOpen}
          onClick={() => setIsNavbarOpen((o) => !o)}
          size="sm"
        />
        <FullLogo colorScheme={colorScheme} />
        <MenuActions />
      </Group>
    </Header>
  );
}
