import { useMutation, useQueryClient } from 'react-query';

import { S3Client } from '../clients/s3.ts';
import { notifyError } from '../utils/notification/notifyError.ts';
import { getQueryKey } from './useGetFileFromS3.ts';

export const useUploadToS3 = (path: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ body }: { body: string }) => {
      return S3Client.putObject(path, body);
    },
    onError: (error) => {
      notifyError({
        error,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getQueryKey(path) });
    },
  });
};
