import { PropsWithChildren, useMemo, useState } from 'react';

import { FolderEditorContext } from '../contexts/folderEditorContext.ts';
import { FolderStructure } from '../types/folderStructure.ts';
import { getSortedLocales } from '../utils/locale/getSortedLocales.ts';

type FolderEditorContextProviderProps = PropsWithChildren<{
  filenames: string[];
  folderStructure: FolderStructure;
}>;

export function FolderEditorContextProvider({
  filenames,
  folderStructure,
  children,
}: FolderEditorContextProviderProps) {
  const [filename, setFilename] = useState<string>(filenames[0]);
  const locales = useMemo(
    () => (filename ? getSortedLocales(folderStructure[filename]) : []),
    [folderStructure, filename]
  );
  const [locale, setLocale] = useState<string>(locales[0]);
  const [isKeyHidden, setIsKeyHidden] = useState<boolean>(false);

  return (
    <FolderEditorContext.Provider
      value={{
        filename,
        setFilename,
        locale,
        setLocale,
        isKeyHidden,
        setIsKeyHidden,
        filenames,
        locales,
      }}
    >
      {children}
    </FolderEditorContext.Provider>
  );
}
