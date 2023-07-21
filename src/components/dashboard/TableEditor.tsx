import { Center, Loader, Table } from '@mantine/core';
import { flatten } from 'flat';
import { useTranslation } from 'react-i18next';

import { useGetFileFromS3 } from '../../hooks/useGetFileFromS3.ts';

type TableEditorProps = {
  filename: string;
  locale: string;
};

export function TableEditor({ filename, locale }: TableEditorProps) {
  const { t } = useTranslation('dashboard');
  const { file, isLoading } = useGetFileFromS3(
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
    file
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>{t('key')}</th>
          <th>{t('translation')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(translations).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
