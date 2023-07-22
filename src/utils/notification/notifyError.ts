import { notifications } from '@mantine/notifications';
import { isAxiosError } from 'axios';
import { getI18n } from 'react-i18next';

type NotifyErrorConfig = {
  title?: string;
  message?: string;
  error?: unknown;
};

export const notifyError = ({
  title = 'generic.title',
  message = 'generic.message',
  error,
}: NotifyErrorConfig) => {
  const { t, loadNamespaces } = getI18n();
  loadNamespaces('errors').then(() =>
    notifications.show({
      title: t(title, { ns: 'errors' }),
      message: isAxiosError(error)
        ? error.message
        : t(message, { ns: 'errors' }),
      color: 'red',
    })
  );
};
