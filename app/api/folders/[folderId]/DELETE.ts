import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';
import { Folders } from '@/app/services/folders';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ folderId: string }> },
) {
  // Get the users session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session?.user?.id) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // get if the user is an administrator
  const isAdministrator = User.isAdministrator(session.user.id);

  // If the user is not an administrator, return a 401 Unauthorized response
  if (!isAdministrator) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // Extract the folderId from the params
  const { folderId } = await params;

  // Check if the folder exists in the database
  const folder = await prisma.folders.count({
    where: {
      id: folderId,
    },
  });

  // If the folder does not exist, return a 404 response
  if (folder === 0) {
    return NextResponse.json('Could not find the requested folder.', {
      status: 404,
    });
  }

  // Delete all tools that belong to the folder that is being deleted
  await Folders.deleteByUid(folderId);

  // Revalidate the paths to ensure the cache is updated
  revalidatePath('/folders');

  // Revalidate the path to ensure the cache is updated
  return NextResponse.json('Folder deleted successfully');
}
