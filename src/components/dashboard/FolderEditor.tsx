import { Center, Loader, Tabs } from '@mantine/core';

import { useGetFolderStructure } from '../../hooks/useGetFolderStructure.ts';
import { FileEditor } from './FileEditor.tsx';

export function FolderEditor() {
  const { isLoading, folderStructure } = useGetFolderStructure();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const filenames = Object.keys(folderStructure);

  return (
    <Tabs
      defaultValue={filenames[0]}
      orientation="vertical"
      keepMounted={false}
    >
      <Tabs.List>
        {filenames.map((filename) => (
          <Tabs.Tab key={filename} value={filename}>
            {filename}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {filenames.map((filename) => (
        <Tabs.Panel key={filename} value={filename} sx={{ overflow: 'auto' }}>
          <FileEditor filename={filename} folderStructure={folderStructure} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
