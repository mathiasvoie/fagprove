'use client';

import { ToastProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode[];
}

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastProvider />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
