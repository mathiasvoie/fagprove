'use client';

import { Button } from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCreateFolderButtonClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('prompt', 'create');
    params.set('type', 'folder');

    router.push('?' + params);
  };

  return (
    <main className="flex items-start justify-center w-full">
      <>
        <div className="flex flex-col h-auto max-w-[1500px] py-5 w-full">
          <>
            <nav className="flex items-center p-4 justify-between">
              <>
                <span className="flex flex-col gap-1">
                  <h1 className="text-xl font-medium">Mapper</h1>
                  <p className="text-sm text-gray-500">
                    Oversikt over alle mapper som er lagt inn i prosjektet.
                  </p>
                </span>
              </>
              <>
                <Button onPress={onCreateFolderButtonClick} color="primary">
                  Ny mappe
                </Button>
              </>
            </nav>
          </>

          {children}
        </div>
      </>
    </main>
  );
}
