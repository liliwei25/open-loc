import { useEffect, useState } from 'react';

import { S3Client } from '../clients/s3.ts';
import { FolderStructure } from '../types/folderStructure.ts';
import { getFileToLanguageMap } from '../utils/locale/getFileToLanguageMap.ts';
import { notifyError } from '../utils/notification/notifyError.ts';
import { getPathsFromS3Objects } from '../utils/s3/getPathsFromS3Objects.ts';

export const useGetFolderStructure = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [folderStructure, setFolderStructure] = useState<FolderStructure>({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await S3Client.listObjects(
          import.meta.env.VITE_S3_LOCALES_PATH
        );
        const paths = getPathsFromS3Objects(response.Contents);
        const structure = getFileToLanguageMap(paths);
        setFolderStructure(structure);
      } catch (e) {
        console.error(e);
        notifyError({
          error: e,
          message: 'locales.message',
        });
        setFolderStructure({});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    folderStructure,
  };
};
