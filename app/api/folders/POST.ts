import { NextResponse } from 'next/server';

import { prisma } from '@/app/lib/prisma';
import { CreateFolderSchema } from '@/app/schemas/CreateFolder';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth-options';
import { User } from '@/app/services/user';

export async function POST(req: Request) {
  // Get the users session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session?.user?.id) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // get if the user is an administrator
  const isAdministrator = await User.isAdministrator(session.user.id);

  // If the user is not an administrator, return a 401 Unauthorized response
  if (!isAdministrator) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const formdata = await req.formData();

  const name = formdata.get('name') as string;
  const description = formdata.get('description') as string | undefined;

  const isFormValid = CreateFolderSchema.safeParse({ name, description });

  if (!isFormValid.success) {
    return NextResponse.json('Form validation failed.', { status: 401 });
  }

  const isFolderNameTaken = await prisma.folders.count({
    where: {
      name,
    },
  });

  if (isFolderNameTaken > 0) {
    return NextResponse.json('Folder name already exists.', { status: 400 });
  }

  await prisma.folders.create({
    data: {
      name,
      description,
    },
  });

  revalidatePath('/folders');

  return NextResponse.json('Folder created successfully');
}
