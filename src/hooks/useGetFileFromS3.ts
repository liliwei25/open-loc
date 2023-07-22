import { useEffect, useState } from 'react';

import { S3Client } from '../clients/s3.ts';
import { notifyError } from '../utils/notification/notifyError.ts';

export const useGetFileFromS3 = (path: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<Record<string, any>>({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const object = await S3Client.getObject(path);
        const fileBody: string = await object.Body?.transformToString();
        setFile(JSON.parse(fileBody));
      } catch (e) {
        notifyError({
          error: e,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [path]);

  return {
    isLoading,
    file,
  };
};
