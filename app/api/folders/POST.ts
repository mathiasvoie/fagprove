import { NextResponse } from 'next/server';

import { prisma } from '@/app/lib/prisma';
import { CreateFolderSchema } from '@/app/schemas/CreateFolderSchema';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const data = await req.json();

  const { name, description } = data;

  const isFormValid = CreateFolderSchema.safeParse({ ...data });

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
