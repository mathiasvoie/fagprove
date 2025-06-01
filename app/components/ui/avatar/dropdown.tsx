'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

interface AvatarDropdownProps {
  session: Session;
}

export default function AvatarDropdown({ session }: AvatarDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <span className="group cursor-pointer flex items-center gap-3">
          <p className="text-sm">{session.user?.name}</p>
          <div className="group-hover:ring-2 ring-blue-600 rounded-full h-[40px] shrink-0 grow-0 aspect-square bg-gray-100 flex transition-all overflow-hidden items-end justify-center">
            <svg
              className="flex h-7 aspect-square fill-gray-500"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
          </div>
        </span>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="1" onPress={() => signOut()}>
          Logg ut
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
