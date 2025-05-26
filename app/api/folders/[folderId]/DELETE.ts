import { prisma } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { folderId: string } },
) {
  const { folderId } = params;

  const folder = await prisma.folders.count({
    where: {
      id: folderId,
    },
  });

  if (folder === 0) {
    return NextResponse.json('Could not find the requested folder.', {
      status: 404,
    });
  }

  await prisma.folders.delete({
    where: {
      id: folderId,
    },
  });

  revalidatePath('/folders');

  return NextResponse.json('Folder deleted successfully');
}
