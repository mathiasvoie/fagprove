'use client';

import { Button } from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function PageActions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCreateFolderButtonClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('prompt', 'create');
    params.set('type', 'folder');

    router.push('?' + params);
  };

  return (
    <Button onPress={onCreateFolderButtonClick} color="primary">
      Ny mappe
    </Button>
  );
}
