import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import { IconCheck, IconLanguage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { Locale } from '../../constants/locale.ts';

export function LocaleButton() {
  const { t, i18n } = useTranslation([], { keyPrefix: 'locales' });

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default" size={30}>
          <IconLanguage size="1rem" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.values(Locale).map((locale) => (
          <Menu.Item key={locale} onClick={() => i18n.changeLanguage(locale)}>
            <Group align="center">
              <Text>{t(locale)}</Text>
              {locale === i18n.language && <IconCheck size="1rem" />}
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
