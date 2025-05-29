'use client';

import { Button } from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Actions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCreateToolClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('prompt', 'create');
    params.set('type', 'tool');

    router.push('?' + params);
  };

  return (
    <>
      <Button onPress={handleCreateToolClick} color="primary">
        Legg til verktøy
      </Button>
    </>
  );
}
