import { Tabs } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { FolderStructure } from '../../types/folderStructure.ts';
import { getLocaleName } from '../../utils/locale/getLocaleName.ts';
import { getSortedLocales } from '../../utils/locale/getSortedLocales.ts';
import { TableEditor } from './TableEditor.tsx';

type FileEditorProps = {
  filename: string;
  folderStructure: FolderStructure;
};

export function FileEditor({ filename, folderStructure }: FileEditorProps) {
  const locales = getSortedLocales(folderStructure[filename]);
  const { i18n } = useTranslation();

  return (
    <Tabs defaultValue={locales[0]} keepMounted={false}>
      <Tabs.List>
        {locales.map((locale) => (
          <Tabs.Tab key={locale} value={locale}>
            {getLocaleName(locale, i18n.language)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {locales.map((locale) => (
        <Tabs.Panel key={locale} value={locale}>
          <TableEditor filename={filename} locale={locale} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
