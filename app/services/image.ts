import { writeFileSync } from 'fs';

import { prisma } from '../lib/prisma';

async function isUidOccupied(uid: string) {
  return (await prisma.images.count({
    where: {
      id: uid,
    },
  })) > 0
    ? true
    : false;
}

async function GenerateUid() {
  let uid = crypto.randomUUID();

  while (await isUidOccupied(uid)) {
    uid = crypto.randomUUID();
  }

  return uid;
}

const MaxFileSize = 10 * 1000000;
async function FromFileToBuffer(file: File) {
  const bytes = await file.arrayBuffer();

  if (bytes.byteLength > MaxFileSize) {
    throw new Error('Image file exceeds the maximum size of 10MB.');
  }

  const buffer = Buffer.from(bytes);

  return buffer;
}

function getFileExtension(fileName: string) {
  const parts = fileName.split('.');
  return parts.pop();
}

export class ImageService {
  static async saveImage(file: File) {
    if (!file || !(file instanceof File)) {
      throw new Error(
        'No file was provided to the ImageService saveImage method.',
      );
    }

    if (!file.type.startsWith('image')) {
      throw new Error(
        'File provided was not of type image. Please provide a valid image file.',
      );
    }

    const uid = await GenerateUid();
    const buffer = await FromFileToBuffer(file);
    const extension = getFileExtension(file.name) as string;
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
}
