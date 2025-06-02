import { unlinkSync } from 'fs';
import { prisma } from '../lib/prisma';
import { Image } from './image';

export class Tools {
  public static async deleteFromIdArray(array: string[]) {
    const tools = await prisma.tools.findMany({
      where: {
        id: {
          in: array,
        },
      },
      include: {
        image: true,
      },
    });

    var imageIds: string[] = [];
    tools.map((tool) => {
      const fileName = tool.image?.name;
      const fileExtension = tool.image?.extension;

      if (fileName && fileExtension && tool?.imageId) {
        imageIds.push(tool.imageId);
      }
    });

    await Image.deleteFromUidArray(imageIds);

    await prisma.tools.deleteMany({
      where: {
        id: {
          in: array,
        },
      },
    });
  }
}
