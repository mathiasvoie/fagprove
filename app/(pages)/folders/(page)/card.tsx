'use client';

interface FolderCardProps {
  id: string;
  name: string;
  description: string | null;
  isAdministrator: boolean;
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
  isAdministrator,
  tools,
}: FolderCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onDeleteFolderClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('uid', id);
    params.set('prompt', 'remove');
    params.set('type', 'folder');

    router.push('?' + params);
  };

  return (
    <article className="group relative items-center bg-gray-100 hover:ring-2 ring-blue-600 gap-5 w-full flex flex-col rounded-xl p-4 transition-all cursor-pointer duration-300">
      <>
        {isAdministrator && (
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
                  color="danger"
                  onPress={onDeleteFolderClick}
                  classNames={{ wrapper: 'transition-all' }}
                >
                  Slett
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        )}
      </>
      <>
        <Link
          draggable={false}
          href={'/folders/' + id}
          className="flex w-full h-full absolute top-0 left-0 z-0"
        />
      </>
      <span className="flex flex-col w-full">
        <>
          <span className="flex w-full justify-between">
            <span className="flex items-center gap-3">
              <svg className="h-5 fill-gray-500 flex" viewBox="0 0 576 512">
                <path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" />
              </svg>
              <p className="font-medium text-lg truncate text-ellipsis">
                {name}
              </p>
            </span>
            <span className="px-4 rounded-full bg-blue-300/10 text-blue-700 items-center justify-center flex">
              {tools}
            </span>
          </span>
        </>
      </span>
    </article>
  );
}
