import {
  Box,
  Group,
  MediaQuery,
  Navbar,
  rem,
  useMantineColorScheme,
} from '@mantine/core';

import { Logo } from './Logo.tsx';
import { MenuActions } from './MenuActions.tsx';
import { UserMenu } from './UserMenu.tsx';

type DashboardNavbarProps = {
  hidden: boolean;
};

export function DashboardNavbar({ hidden }: DashboardNavbarProps) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Navbar
      p="xs"
      width={{ base: '100%', sm: 300 }}
      hiddenBreakpoint="sm"
      hidden={hidden}
    >
      <MediaQuery styles={{ display: 'none' }} smallerThan="sm">
        <Navbar.Section mt="xs">
          <Box
            sx={(theme) => ({
              paddingLeft: theme.spacing.xs,
              paddingRight: theme.spacing.xs,
              paddingBottom: theme.spacing.lg,
              borderBottom: `${rem(1)} solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
            })}
          >
            <Group position="apart">
              <Logo colorScheme={colorScheme} />
              <MenuActions />
            </Group>
          </Box>
        </Navbar.Section>
      </MediaQuery>
      <Navbar.Section grow mt="md">
        {/* TODO: add items */}
      </Navbar.Section>
      <Navbar.Section>
        <UserMenu />
      </Navbar.Section>
    </Navbar>
  );
}
