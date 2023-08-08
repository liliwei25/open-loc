import {
  ActionIcon,
  Center,
  Loader,
  Stack,
  Table,
  TextInput,
} from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { flatten, unflatten } from 'flat';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFolderEditorContext } from '../../contexts/folderEditorContext.ts';
import { useGetFileFromS3 } from '../../hooks/useGetFileFromS3.ts';
import { useUploadToS3 } from '../../hooks/useUploadToS3.ts';
import { LoadingButton } from '../buttons/LoadingButton.tsx';

type TableEditorForm = {
  translations: { key: string; value: string }[];
};

export function TableEditor() {
  const { t } = useTranslation('dashboard');
  const { locale, filename, isKeyHidden } = useFolderEditorContext();
  const fileKey = `${
    import.meta.env.VITE_S3_LOCALES_PATH
  }/${locale}/${filename}`;
  const { data, isLoading } = useGetFileFromS3(fileKey);
  const {
    register,
    control,
    formState: { isDirty },
    reset,
    handleSubmit,
  } = useForm<TableEditorForm>();
  const { fields, remove } = useFieldArray({
    name: 'translations',
    control,
  });
  const { mutateAsync, isLoading: isSaving } = useUploadToS3(fileKey);

  const translations = useMemo(
    () => flatten<Record<string, any>, Record<string, string>>(data || {}),
    [data]
  );

  useEffect(() => {
    reset({
      translations: Object.entries(translations).map(([key, value]) => ({
        key,
        value,
      })),
    });
  }, [reset, translations, isLoading]);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Stack>
      <Table highlightOnHover striped withColumnBorders>
        <thead>
          <tr>
            {!isKeyHidden && <th>{t('key')}</th>}
            <th>{t('translation')}</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(({ key }, index) => (
            <tr key={key}>
              {!isKeyHidden && (
                <td>
                  <TextInput
                    {...register(`translations.${index}.key`)}
                    sx={{ input: { background: 'inherit' } }}
                  />
                </td>
              )}
              <td>
                <TextInput
                  {...register(`translations.${index}.value`)}
                  sx={{ input: { background: 'inherit' } }}
                />
              </td>
              <td width="40px">
                <ActionIcon
                  color="red"
                  radius="xl"
                  onClick={() => remove(index)}
                >
                  <IconMinus />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <LoadingButton
        isLoading={isSaving}
        disabled={!isDirty}
        onClick={handleSubmit(async ({ translations }) => {
          const data = translations.reduce(
            (dict, { key, value }) => ({
              ...dict,
              [key]: value,
            }),
            {}
          );
          await mutateAsync({ body: JSON.stringify(unflatten(data)) });
        })}
      >
        {t('save')}
      </LoadingButton>
    </Stack>
  );
}
