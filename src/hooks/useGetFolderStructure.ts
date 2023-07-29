import { useQuery } from 'react-query';

import { S3Client } from '../clients/s3.ts';
import { getFileToLanguageMap } from '../utils/locale/getFileToLanguageMap.ts';
import { notifyError } from '../utils/notification/notifyError.ts';
import { getPathsFromS3Objects } from '../utils/s3/getPathsFromS3Objects.ts';

export const useGetFolderStructure = () =>
  useQuery({
    queryKey: ['getFolderStructure'],
    queryFn: async () => {
      const response = await S3Client.listObjects(
        import.meta.env.VITE_S3_LOCALES_PATH
      );
      const paths = getPathsFromS3Objects(response.Contents);
      return getFileToLanguageMap(paths);
    },
    onError: (error) => {
      console.error(error);
      notifyError({
        error,
        message: 'locales.message',
      });
    },
    staleTime: 300000,
  });
