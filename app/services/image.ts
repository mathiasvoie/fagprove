import { unlinkSync, writeFileSync } from 'fs';

import { prisma } from '../lib/prisma';
export class Image {
  private static async isUidOccupied(uid: string) {
    return (await prisma.images.count({
      where: {
        id: uid,
      },
    })) > 0
      ? true
      : false;
  }

  private static async generateUid() {
    let uid = crypto.randomUUID();

    while (await this.isUidOccupied(uid)) {
      uid = crypto.randomUUID();
    }

    return uid;
  }

  private static getExtension(fileName: string) {
    const parts = fileName.split('.');
    return parts.pop();
  }

  private static isFileImage(file: File) {
    return !file || !(file instanceof File) || !file.type.startsWith('image')
      ? false
      : true;
  }

  private static async convertFromFileToBuffer(file: File) {
    const bytes = await file.arrayBuffer();

    if (bytes.byteLength > 10 * 1000000) {
      // 10MB
      throw new Error('Image file exceeds the maximum size of 10MB.');
    }

    const buffer = Buffer.from(bytes);

    return buffer;
  }

  public static async Save(file: File) {
    const isImage = this.isFileImage(file);

    if (!isImage) {
      throw new Error('The provided file is not a  valid image.');
    }

    const uid = await this.generateUid();
    const buffer = await this.convertFromFileToBuffer(file);
    const extension = this.getExtension(file.name) as string;
    const size = file.size;

    writeFileSync('public/uploads/' + uid + '.' + extension, buffer);

    await prisma.images.create({
      data: {
        id: uid,
        name: file.name,
        extension: extension,
        size: size,
      },
    });

    return uid;
  }

  public static async deleteFromUid(uid: string) {
    const image = await prisma.images.findUnique({
      where: {
        id: uid,
      },
    });

    if (image) {
      unlinkSync('public/uploads/' + image.id + '.' + image.extension);

      await prisma.images.delete({
        where: {
          id: uid,
        },
      });
    }
  }

  public static async deleteFromUidArray(array: string[]) {
    const images = await prisma.images.findMany({
      where: {
        id: {
          in: array,
        },
      },
    });

    images.map((image) => {
      unlinkSync('public/uploads/' + image.id + '.' + image.extension);
    });

    await prisma.images.deleteMany({
      where: {
        id: {
          in: array,
        },
      },
    });
  }
}
