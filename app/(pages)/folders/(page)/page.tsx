import { getServerSession } from 'next-auth';
import FolderCard from './card';

import { Folders } from '@/app/services/folders';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';

export default async function FoldersPage() {
  const folders = await Folders.getAll();

  const session = await getServerSession(authOptions);

  const isAdministrator =
    session?.user?.id && (await User.isAdministrator(session?.user?.id));

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4">
      {folders.map((folder) => (
        <FolderCard
          isAdministrator={!!isAdministrator && isAdministrator}
          key={folder.id}
          {...folder}
        />
      ))}
    </div>
  );
}
