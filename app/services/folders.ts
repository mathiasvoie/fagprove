import { prisma } from '../lib/prisma';

export async function getFolders() {
  return await prisma.folders.findMany({
    include: {
      image: true,
    },
  });
}
