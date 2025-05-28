import { useForm } from 'react-hook-form';

import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from '@/app/schemas/RegisterUser';

import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterForm() {
  return useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });
}
