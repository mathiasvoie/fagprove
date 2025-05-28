'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export class RouterService {
  private static router = useRouter();
  private static searchParams = useSearchParams();
}
