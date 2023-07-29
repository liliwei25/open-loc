import { Group, Select, Switch } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useFolderEditorContext } from '../../contexts/folderEditorContext.ts';
import { getLocaleName } from '../../utils/locale/getLocaleName.ts';

export function FolderEditorOptions() {
  const { t, i18n } = useTranslation('dashboard');
  const {
    filename,
    setFilename,
    locale,
    setLocale,
    isKeyHidden,
    setIsKeyHidden,
    filenames,
    locales,
  } = useFolderEditorContext();

  return (
    <Group>
      <Select
        placeholder={t('selectFile')}
        searchable
        nothingFound={t('notFound')}
        data={filenames}
        value={filename}
        onChange={(value) => value && setFilename(value)}
      />
      <Select
        placeholder={t('selectLocale')}
        searchable
        nothingFound={t('notFound')}
        data={locales.map((locale) => ({
          value: locale,
          label: getLocaleName(locale, i18n.language),
        }))}
        value={locale}
        onChange={(value) => value && setLocale(value)}
      />
      <Switch
        label={t('hideKey')}
        checked={isKeyHidden}
        onChange={(e) => setIsKeyHidden(e.currentTarget.checked)}
      />
    </Group>
  );
}
