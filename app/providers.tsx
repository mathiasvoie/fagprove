'use client';

import { ToastProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastProvider />

      {children}
    </SessionProvider>
  );
}
