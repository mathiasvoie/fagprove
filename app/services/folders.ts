import { prisma } from '../lib/prisma';
import { Image } from './image';

export class Folders {
  public static async getAll() {
    const response = await prisma.folders.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        tools: true,
      },
    });

    if (!response) return [];

    return response.map((folder) => ({
      id: folder.id,
      name: folder.name,
      description: folder.description,
      tools: folder.tools.length,
    }));
  }
  public static async getByUid(uid: string) {
    return await prisma.folders.findUnique({
      where: {
        id: uid,
      },
    });
  }
  public static async getMetadataByUid(uid: string) {
    const folder = await prisma.folders.findUnique({
      where: {
        id: uid,
      },
      select: {
        name: true,
        description: true,

        tools: {
          select: { id: true },
        },
      },
    });

    if (!folder) return null;

    return {
      name: folder.name,
      description: folder.description,

      tools: folder.tools.length,
    };
  }

  public static async getToolsFromUid(uid: string) {
    return await prisma.tools.findMany({
      where: {
        folderId: uid,
      },
      include: {
        image: true,
      },
    });
  }

  public static async deleteByUid(uid: string) {
    const folder = await prisma.folders.findUnique({
      where: {
        id: uid,
      },
    });

    if (folder) {
      const tools = await prisma.tools.findMany({
        where: {
          folderId: uid,
        },
      });

      let imageIds: string[] = [];
      tools.map((tool) => {
        if (!tool?.imageId) {
          return
        }

        imageIds = [...imageIds + tool?.imageId]
      });

      if (imageIds.length !== 0) {
        await Image.deleteFromUidArray([...imageIds]);
      }

      await prisma.tools.deleteMany({
        where: {
          id: {
            in: tools.map((tool) => tool.id),
          },
        },
      });

      return await prisma.folders.delete({
        where: {
          id: uid,
        },
      });
    }
  }
}
