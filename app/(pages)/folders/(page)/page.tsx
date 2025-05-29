import FolderCard from './card';

import { Folders } from '@/app/services/folders';

export default async function FoldersPage() {
  const folders = await Folders.getAll();

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4">
      {folders.map((folder) => (
        <FolderCard key={folder.id} {...folder} />
      ))}
    </div>
  );
}
