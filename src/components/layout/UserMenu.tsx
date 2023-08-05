import { Avatar, Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '../../contexts/authContext.ts';

export function UserMenu() {
  const { user, logout } = useAuthContext();
  const { t } = useTranslation('dashboard');

  if (!user) {
    return <></>;
  }

  return (
    <Menu shadow="md" position="bottom">
      <Menu.Target>
        <Avatar
          src={user.picture}
          radius="xl"
          size="sm"
          sx={{ cursor: 'pointer' }}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconLogout size={14} />} onClick={logout}>
          {t('logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
