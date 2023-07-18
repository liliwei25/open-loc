import { Group } from '@mantine/core';

import { ColorSchemeButton } from './ColorSchemeButton.tsx';
import { LocaleButton } from './LocaleButton.tsx';

export function MenuActions() {
  return (
    <Group spacing="xs">
      <ColorSchemeButton />
      <LocaleButton />
    </Group>
  );
}
