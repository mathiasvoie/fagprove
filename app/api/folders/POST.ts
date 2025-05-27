import { NextResponse } from 'next/server';

import { prisma } from '@/app/lib/prisma';
import { CreateFolderSchema } from '@/app/schemas/CreateFolderSchema';
import { revalidatePath } from 'next/cache';
import { ImageService } from '@/app/services/image';

export async function POST(req: Request) {
  const formdata = await req.formData();

  const name = formdata.get('name') as string;
  const description = formdata.get('description') as string | undefined;
  const image = formdata.get('image') as File | null;

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

  let imageId: string | undefined;
  if (image) {
    const response = await ImageService.saveImage(image);

    if (!response) {
      return NextResponse.json('Failed to save the image that was provided.', {
        status: 500,
      });
    }

    imageId = response;
  }

  await prisma.folders.create({
    data: {
      name,
      description,
      imageId: imageId,
    },
  });

  revalidatePath('/folders');

  return NextResponse.json('Folder created successfully');
}
