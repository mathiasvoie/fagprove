'use client';

import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <main className="flex w-full h-full items-center justify-center">
      <Spinner />
    </main>
  );
}
