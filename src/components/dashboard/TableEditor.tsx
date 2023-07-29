import { Center, Loader, Table } from '@mantine/core';
import { flatten } from 'flat';
import { useTranslation } from 'react-i18next';

import { useFolderEditorContext } from '../../contexts/folderEditorContext.ts';
import { useGetFileFromS3 } from '../../hooks/useGetFileFromS3.ts';

export function TableEditor() {
  const { t } = useTranslation('dashboard');
  const { locale, filename, isKeyHidden } = useFolderEditorContext();
  const { data, isLoading } = useGetFileFromS3(
    `${import.meta.env.VITE_S3_LOCALES_PATH}/${locale}/${filename}`
  );

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const translations = flatten<Record<string, any>, Record<string, string>>(
    data
  );

  return (
    <Table highlightOnHover striped withColumnBorders>
      <thead>
        <tr>
          {!isKeyHidden && <th>{t('key')}</th>}
          <th>{t('translation')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(translations).map(([key, value]) => (
          <tr key={key}>
            {!isKeyHidden && <td>{key}</td>}
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
