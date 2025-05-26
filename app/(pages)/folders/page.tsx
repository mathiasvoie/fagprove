import FolderCard from './card';

import { getFolders } from '@/app/services/folders';

export default async function FoldersPage() {
  const folders = await getFolders();

  const content = folders.map((folder) => (
    <FolderCard key={folder.id} {...folder} />
  ));

  return <div className="grid grid-cols-4 gap-4 p-4">{content}</div>;
}
