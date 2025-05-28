import { useForm } from 'react-hook-form';

import { UserLoginSchema, UserLoginSchemaType } from '@/app/schemas/UserLogin';

import { zodResolver } from '@hookform/resolvers/zod';

export default function UserLoginForm() {
  return useForm<UserLoginSchemaType>({
    resolver: zodResolver(UserLoginSchema),
  });
}
