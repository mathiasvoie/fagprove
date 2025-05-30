import { prisma } from '../lib/prisma';
import { Image } from './image';

export class Folders {
  public static async getAll() {
    const response = await prisma.folders.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        tools: true,
      },
    });

    if (!response) return [];

    return response.map((folder) => ({
      id: folder.id,
      name: folder.name,
      description: folder.description,
      image: folder.image,
      tools: folder.tools.length,
    }));
  }
  public static async getByUid(uid: string) {
    return await prisma.folders.findUnique({
      where: {
        id: uid,
      },
      include: {
        image: true,
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
        image: true,
        tools: {
          select: { id: true },
        },
      },
    });

    if (!folder) return null;

    return {
      name: folder.name,
      description: folder.description,
      image: folder.image,
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
      tools.map((tool) => tool.imageId && imageIds.push(tool.imageId));

      if (folder?.imageId) {
        await Image.deleteFromUidArray([folder.imageId, ...imageIds]);
      }

      return await prisma.folders.delete({
        where: {
          id: uid,
        },
      });
    }
  }
}
