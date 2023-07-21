import {
  ActionIcon,
  Box,
  Group,
  MediaQuery,
  Navbar,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';

import { FullLogo } from './FullLogo.tsx';
import { MenuActions } from './MenuActions.tsx';
import { UserMenu } from './UserMenu.tsx';

type DashboardNavbarProps = {
  hidden: boolean;
};

export function DashboardNavbar({ hidden }: DashboardNavbarProps) {
  const { colorScheme } = useMantineColorScheme();
  const [isMinimized, toggleIsMinimized] = useToggle();

  return (
    <Navbar
      p="xs"
      width={{ base: '100%', sm: isMinimized ? 50 : 300 }}
      hiddenBreakpoint="sm"
      hidden={hidden}
      sx={{ transition: 'all 1s, background 0s, border-color 0s' }}
    >
      <MediaQuery styles={{ display: 'none' }} smallerThan="sm">
        <Navbar.Section mt="xs">
          <ActionIcon
            onClick={() => toggleIsMinimized()}
            variant="default"
            size="xs"
            sx={{
              position: 'absolute',
              top: isMinimized ? '137px' : '60px',
              right: '-10px',
              transition: 'top 1s',
            }}
          >
            <IconChevronRight
              style={{ transition: 'transform 1s' }}
              transform={isMinimized ? 'rotate(0)' : 'rotate(180)'}
            />
          </ActionIcon>
          <Box
            px={isMinimized ? 0 : 'xs'}
            sx={(theme) => ({
              paddingBottom: theme.spacing.lg,
              borderBottom: `${rem(1)} solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
            })}
          >
            <Group position="apart">
              <Box sx={{ height: '20px', overflow: 'hidden' }}>
                <FullLogo colorScheme={colorScheme} />
              </Box>
              <MenuActions />
            </Group>
          </Box>
        </Navbar.Section>
      </MediaQuery>
      <Navbar.Section grow mt="md">
        {/* TODO: add items */}
      </Navbar.Section>
      <Navbar.Section>
        <UserMenu isMinimized={isMinimized} />
      </Navbar.Section>
    </Navbar>
  );
}
