'use client';

import { useForm } from 'react-hook-form';

import { UserLoginSchema, UserLoginSchemaType } from '@/app/schemas/UserLogin';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

export default function UserLoginForm() {
  // Get the params from the URL
  const searchParams = useSearchParams();

  // Get the login hint from the url
  const loginHint = searchParams.get('login_hint');

  return useForm<UserLoginSchemaType>({
    defaultValues: {
      email: loginHint ? loginHint : undefined,
    },

    resolver: zodResolver(UserLoginSchema),
  });
}
