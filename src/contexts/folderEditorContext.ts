import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type FolderEditorContextType = {
  filename: string;
  setFilename: Dispatch<SetStateAction<string>>;
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  isKeyHidden: boolean;
  setIsKeyHidden: Dispatch<SetStateAction<boolean>>;
  filenames: string[];
  locales: string[];
};

export const FolderEditorContext = createContext<
  FolderEditorContextType | undefined
>(undefined);

export const useFolderEditorContext = (): FolderEditorContextType => {
  const folderEditorContext = useContext(FolderEditorContext);

  if (!folderEditorContext) {
    throw new Error('Folder editor context not available');
  }

  return folderEditorContext;
};
