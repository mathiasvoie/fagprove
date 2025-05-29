import { Folders } from '@/app/services/folders';
import ToolCard from './card';

interface PageProps {
  params: Promise<{ folderId: string }>;
}

export default async function FolderPage({ params }: PageProps) {
  const { folderId } = await params;

  const tools = await Folders.getToolsFromUid(folderId);

  return (
    <>
      {tools.map((tool) => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </>
  );
}
