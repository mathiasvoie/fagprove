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

  // Parse the form data from the request
  const formdata = await req.formData();

  const name = formdata.get('name') as string;
  const description = formdata.get('description') as string | undefined;

  // Validate the form data using the CreateFolderSchema
  const isFormValid = CreateFolderSchema.safeParse({ name, description });

  // If the form data is not valid, return a 401 Unauthorized response
  if (!isFormValid.success) {
    return NextResponse.json('Form validation failed.', { status: 401 });
  }

  // Check if the folder name is already taken
  const isFolderNameTaken = await prisma.folders.count({
    where: {
      name,
    },
  });

  // If the folder name is already taken, return a 409 Conflict response
  if (isFolderNameTaken > 0) {
    return NextResponse.json('Folder name already exists.', { status: 409 });
  }

  // Create the folder in the database
  await prisma.folders.create({
    data: {
      name,
      description,
    },
  });

  // Revalidate the path to update the cache
  revalidatePath('/folders');

  // Return a success response
  return NextResponse.json('Folder created successfully');
}
