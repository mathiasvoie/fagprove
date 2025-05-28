import FolderCard from './card';

import { Folders } from '@/app/services/folders';

export default async function FoldersPage() {
  const folders = await Folders.getAll();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {folders.map((folder) => (
        <FolderCard key={folder.id} {...folder} />
      ))}
    </div>
  );
}
