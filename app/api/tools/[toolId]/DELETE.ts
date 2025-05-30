import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth-options';
import { NextResponse } from 'next/server';
import { User } from '@/app/services/user';
import { prisma } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Tools } from '@/app/services/tools';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ toolId: string }> },
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

  // Extract the toolId from the params
  const { toolId } = await params;

  // Check if the tool exists in the database
  const doesExist = await prisma.tools.count({
    where: {
      id: toolId,
    },
  });

  if (doesExist === 0) {
    // If the tool does not exist, return a 404 response
    return NextResponse.json('Could not find the requested tool.', {
      status: 404,
    });
  }

  await Tools.deleteFromIdArray([toolId]);

  // Revalidate the paths to ensure the cache is updated
  revalidatePath('/tools');
  revalidatePath('/tools/[toolId]');

  // Revalidate the path to ensure the cache is updated
  return NextResponse.json('Successfully deleted tool');
}
