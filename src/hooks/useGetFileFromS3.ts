import { useQuery } from 'react-query';

import { S3Client } from '../clients/s3.ts';
import { notifyError } from '../utils/notification/notifyError.ts';

export const useGetFileFromS3 = (path: string) =>
  useQuery({
    queryKey: ['getFileFromS3', path],
    queryFn: async () => {
      const object = await S3Client.getObject(path);
      const fileBody: string = await object.Body?.transformToString();
      return JSON.parse(fileBody);
    },
    onError: (error) => {
      notifyError({
        error,
      });
    },
    staleTime: 300000,
  });
