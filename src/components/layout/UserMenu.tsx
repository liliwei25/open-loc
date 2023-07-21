import {
  Avatar,
  Box,
  Group,
  Menu,
  rem,
  Text,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '../../contexts/authContext.ts';

type UserMenuProps = {
  isMinimized: boolean;
};

export function UserMenu({ isMinimized }: UserMenuProps) {
  const theme = useMantineTheme();
  const { user, logout } = useAuthContext();
  const { t } = useTranslation('dashboard');
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isSmall = isMinimized && !isSmallScreen;

  if (!user) {
    return <></>;
  }

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Menu
        shadow="md"
        width={isSmallScreen ? '100%' : 200}
        position={isSmallScreen ? 'top' : 'right'}
      >
        <Menu.Target>
          <UnstyledButton
            p={isSmall ? 0 : 'xs'}
            sx={{
              display: 'block',
              width: '100%',
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                src={user.picture}
                radius="xl"
                size={isSmall ? 'sm' : 'md'}
                sx={{ transition: 'all 1s' }}
              />
              <Transition
                transition="slide-left"
                mounted={!isSmall}
                exitDuration={0}
              >
                {() => (
                  <>
                    <Box sx={{ flex: 1 }}>
                      <Text size="sm" weight={500}>
                        {user.name}
                      </Text>
                      <Text color="dimmed" size="xs">
                        {user.email}
                      </Text>
                    </Box>
                    <IconChevronRight size={rem(18)} />
                  </>
                )}
              </Transition>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size={14} />} onClick={logout}>
            {t('logout')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
