import {
  ActionIcon,
  Alert,
  Center,
  Checkbox,
  Loader,
  Stack,
  Table,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconAlertCircle, IconMinus, IconPlus } from '@tabler/icons-react';
import { flatten, unflatten } from 'flat';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFolderEditorContext } from '../../contexts/folderEditorContext.ts';
import { useGetFileFromS3 } from '../../hooks/useGetFileFromS3.ts';
import { useUploadToS3 } from '../../hooks/useUploadToS3.ts';
import { Translation } from '../../types/translation.ts';
import { isAllUnique } from '../../utils/array/isAllUnique.ts';
import { LoadingButton } from '../buttons/LoadingButton.tsx';

type TableEditorForm = {
  translations: Translation[];
  confirmSave?: boolean;
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
    watch,
  } = useForm<TableEditorForm>();
  const { fields, remove, append } = useFieldArray({
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

  const hasDuplicatedKeys = !isAllUnique(
    (watch('translations') ?? []).map(({ key }) => key)
  );

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
          {fields.map(({ id }, index) => (
            <tr key={id}>
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
                <Tooltip label={t('remove')} openDelay={500}>
                  <ActionIcon
                    color="red"
                    radius="xl"
                    onClick={() => remove(index)}
                  >
                    <IconMinus />
                  </ActionIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>
              <Tooltip label={t('addNewTranslation')} openDelay={500}>
                <ActionIcon
                  color="green"
                  sx={{ width: '100%' }}
                  onClick={() => append({ key: '', value: '' })}
                >
                  <IconPlus />
                </ActionIcon>
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </Table>
      {hasDuplicatedKeys && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title={t('warnings.title')}
          color="orange"
          variant="outline"
        >
          {t('warnings.duplicatedKeys')}
          <Checkbox
            {...register('confirmSave')}
            label={t('confirmSave')}
            sx={{ marginTop: '8px' }}
          />
        </Alert>
      )}
      <LoadingButton
        isLoading={isSaving}
        disabled={!isDirty || (hasDuplicatedKeys && !watch('confirmSave'))}
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
