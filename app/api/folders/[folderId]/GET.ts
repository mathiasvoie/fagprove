import { Folders } from '@/app/services/folders';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ folderId: string }> },
) => {
  const { folderId } = await params;

  const folder = await Folders.getByUid(folderId);

  if (!folder) {
    return NextResponse.json('Failed to find folder', { status: 404 });
  }

  return NextResponse.json(folder);
};
