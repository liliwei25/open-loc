import { Center, Loader, Stack } from '@mantine/core';
import { useMemo } from 'react';

import { useGetFolderStructure } from '../../hooks/useGetFolderStructure.ts';
import { FolderEditorContextProvider } from '../../providers/FolderEditorContextProvider.tsx';
import { FolderEditorOptions } from './FolderEditorOptions.tsx';
import { TableEditor } from './TableEditor.tsx';

export function FolderEditor() {
  const { isLoading, data: folderStructure = {} } = useGetFolderStructure();
  const filenames = useMemo(
    () => Object.keys(folderStructure),
    [folderStructure]
  );

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <FolderEditorContextProvider
      filenames={filenames}
      folderStructure={folderStructure}
    >
      <Stack>
        <FolderEditorOptions />
        <TableEditor />
      </Stack>
    </FolderEditorContextProvider>
  );
}
