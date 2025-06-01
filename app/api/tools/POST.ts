import { prisma } from '@/app/lib/prisma';
import { CreateToolSchema } from '@/app/schemas/CreateTool';
import { Image } from '@/app/services/image';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
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

  // Parse the request body as JSON
  const formdata = await req.formData();

  const name = formdata.get('name') as string;
  const description = formdata.get('description') as string;
  const folderId = formdata.get('folderId') as string;
  const image = formdata.get('image') as File | undefined;

  // Validate the body against the CreateToolSchema
  const isValid = CreateToolSchema.safeParse({ name, description });

  // If validation fails, return a 400 response with the error message
  if (!isValid.success) {
    return new Response(JSON.stringify(isValid.error), { status: 400 });
  }

  // Check if folderId is provided
  if (!folderId) {
    return NextResponse.json('Folder Id is required', { status: 404 });
  }

  // Check if the folder exists in the database
  const folder = await prisma.folders.findUnique({
    where: {
      id: folderId,
    },
  });

  // If the folder does not exist, return a 404 response
  if (!folder) {
    return NextResponse.json('Folder not found', { status: 404 });
  }

  // Make a globally accessible variable for imageId
  let imageId: string | undefined;

  // Since image File is always thruthy, we can check if it has a size greater than 0
  if (image && image?.size > 0) {
    const response = await Image.Save(image);

    if (!response) {
      return NextResponse.json('Failed to save the image that was provided.', {
        status: 500,
      });
    }

    imageId = response;
  }

  // Insert the record into the database using Prisma
  await prisma.tools.create({
    data: {
      name,
      description,
      folderId,
      imageId: imageId,
    },
  });

  // Revalidate the path to ensure the cache is updated
  revalidatePath('/folders/' + folderId);

  // Revalidate the path for the folders list to ensure it reflects the new tool
  revalidatePath('/folders');

  // Return a success response
  return NextResponse.json('Successfully created tool');
}
