'use client';

import Image from 'next/image';

interface FolderCardProps {
  id: string;
  name: string;
  description: string | null;
  image: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    extension: string;
    size: number;
  } | null;
  tools: number;
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
  image,
  description,
  tools,
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

  console.log(tools);

  return (
    <article className="group relative bg-gray-50 gap-5 w-full flex flex-col rounded-xl p-4 transition-all cursor-pointer duration-300">
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
        <div className="flex w-full rounded-xl overflow-hidden aspect-video items-center justify-center px-12 grow-0 h-[175px]">
          {image ? (
            <Image
              draggable={false}
              src={'/uploads/' + image.id + '.' + image.extension}
              alt="Failed to load resource."
              className="flex w-full object-cover"
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
          <span className="flex w-full justify-between">
            <p className="font-medium text-lg truncate text-ellipsis">{name}</p>
            <span className="px-4 rounded-full bg-green-300/10 text-green-700 items-center justify-center flex">
              {tools}
            </span>
          </span>
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
