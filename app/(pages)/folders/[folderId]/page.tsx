import { Folders } from '@/app/services/folders';
import ToolCard from './card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';

interface PageProps {
  params: Promise<{ folderId: string }>;
}

export default async function FolderPage({ params }: PageProps) {
  const { folderId } = await params;

  const tools = await Folders.getToolsFromUid(folderId);

  const session = await getServerSession(authOptions);

  const isAdministrator =
    session?.user?.id && (await User.isAdministrator(session?.user?.id));

  return (
    <>
      {tools.map((tool) => (
        <ToolCard
          isAdministrator={!!isAdministrator && isAdministrator}
          key={tool.id}
          {...tool}
        />
      ))}
    </>
  );
}
