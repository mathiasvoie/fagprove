import { prisma } from '../lib/prisma';

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
  public static async getNameByUid(uid: string) {
    return (
      await prisma.folders.findUnique({
        where: {
          id: uid,
        },
        select: {
          name: true,
        },
      })
    )?.name;
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
    });
  }
}
