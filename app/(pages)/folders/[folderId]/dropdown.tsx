'use client';

import {
  Button,
  Dropdown as DropdownContainer,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Dropdown({ uid }: { uid: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <span className="absolute top-0 right-0 p-3">
      <DropdownContainer>
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
            onPress={() => {
              const params = new URLSearchParams(searchParams);
              params.set('prompt', 'remove');
              params.set('type', 'tool');
              params.set('uid', uid);

              router.push('?' + params);
            }}
            classNames={{ wrapper: 'transition-all' }}
          >
            Slett
          </DropdownItem>
        </DropdownMenu>
      </DropdownContainer>
    </span>
  );
}
