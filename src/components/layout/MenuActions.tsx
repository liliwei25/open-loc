import { Group } from '@mantine/core';

import { ColorSchemeButton } from './ColorSchemeButton.tsx';
import { LocaleButton } from './LocaleButton.tsx';

type MenuActionsProps = {
  isMinimized?: boolean;
};

export function MenuActions({ isMinimized }: MenuActionsProps) {
  return (
    <Group spacing={isMinimized ? 0 : 'xs'}>
      <ColorSchemeButton />
      <LocaleButton />
    </Group>
  );
}
