'use client';

import Image from 'next/image';

interface FolderCardProps {
  id: string;
  name: string;
  description: string | null;
  imageId: string | null;
  createdAt: Date;
  updatedAt: Date;
  image: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    size: number;
    extension: string;
  } | null;
}

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function FolderCard({
  id,
  name,
  description,
  imageId,
  image,
  createdAt,
  updatedAt,
}: FolderCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onEditFolderClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('uid', id);
    params.set('prompt', 'edit');
    params.set('type', 'folder');

    router.push('?' + params);
  };

  const onDeleteFolderClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('uid', id);
    params.set('prompt', 'remove');
    params.set('type', 'folder');

    router.push('?' + params);
  };

  return (
    <article className="group relative bg-white gap-5 w-full flex flex-col rounded-xl p-4 transition-all cursor-pointer duration-300">
      <>
        <span className="absolute top-0 right-0 p-3">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                radius="full"
                className="flex z-10 w-[35px] hover:scale-110 aspect-square items-center justify-center bg-black/25 group-hover:opacity-100 opacity-0 transition-all hover:bg-black/50"
              >
                <svg className="h-2/3 fill-white" viewBox="0 0 448 512">
                  <path d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                variant="flat"
                key="1"
                onPress={onEditFolderClick}
                classNames={{ wrapper: 'transition-all' }}
              >
                Rediger
              </DropdownItem>
              <DropdownItem
                variant="flat"
                key="2"
                color="danger"
                onPress={onDeleteFolderClick}
                classNames={{ wrapper: 'transition-all' }}
              >
                Slett
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
      </>
      <>
        <Link
          draggable={false}
          href={'/folders/' + id}
          className="flex w-full h-full absolute top-0 left-0 z-0"
        />
      </>
      <>
        <div className="flex w-full rounded-xl aspect-video items-center justify-center px-12 grow-0 h-[175px]">
          {image ? (
            <Image
              draggable={false}
              src={'/uploads/' + image.id + '.' + image.extension}
              alt="Failed to load resource."
              className="flex w-full object-fill"
              width={475}
              height={475}
            />
          ) : (
            <Image
              draggable={false}
              src="/svg/asset-selection.svg"
              alt="Asset selection icon"
              className="w-full aspect-video"
              width={475}
              height={475}
            />
          )}
        </div>
      </>
      <span className="flex flex-col w-full">
        <>
          <p className="font-medium text-lg truncate text-ellipsis">{name}</p>
        </>
        <>
          {!!description && (
            <>
              <p className="text-sm text-gray-500 line-clamp-3">
                {description}
              </p>
            </>
          )}
        </>
      </span>
    </article>
  );
}
