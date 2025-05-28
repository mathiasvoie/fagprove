import { Folders } from '@/app/services/folders';
import { ToolCard } from './card';

interface PageProps {
  params: Promise<{ folderId: string }>;
}

export default async function FolderPage({ params }: PageProps) {
  const { folderId } = await params;

  const tools = await Folders.getToolsFromUid(folderId);

  return (
    <>
      {tools.map((tool) => {
        const card = new ToolCard(
          tool.id,
          tool.name,
          tool.description,
          tool.imageId,
          tool.createdAt,
          tool.updatedAt,
        );

        return card.render();
      })}
    </>
  );
}
