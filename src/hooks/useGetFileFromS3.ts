import { useQuery } from 'react-query';

import { S3Client } from '../clients/s3.ts';
import { notifyError } from '../utils/notification/notifyError.ts';

export const getQueryKey = (path: string) => ['getFileFromS3', path];

export const useGetFileFromS3 = (path: string) =>
  useQuery(getQueryKey(path), {
    queryFn: async () => {
      const object = await S3Client.getObject(path);
      const fileBody = await object.Body?.transformToString();
      return fileBody ? JSON.parse(fileBody) : {};
    },
    onError: (error) => {
      notifyError({
        error,
      });
    },
    staleTime: 300000,
  });
