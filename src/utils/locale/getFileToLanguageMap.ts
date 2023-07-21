import { get } from 'lodash';

import { FolderStructure } from '../../types/folderStructure.ts';
import { isNotNil } from '../typeGuards/isNotNil.ts';

export const getFileToLanguageMap = (paths: string[]): FolderStructure => {
  const regex = new RegExp(
    `^${import.meta.env.VITE_S3_LOCALES_PATH}/(\\w+)/(\\w+.json)$`
  );
  return paths
    .map((path) => regex.exec(path))
    .filter(isNotNil)
    .reduce(
      (structure, res) => ({
        ...structure,
        [res[2]]: [...get(structure, res[2], []), res[1]],
      }),
      {}
    );
};
