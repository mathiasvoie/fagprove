import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateFolderSchema,
  CreateFolderSchemaType,
} from '@/app/schemas/CreateFolderSchema';

export default function CreateFolderForm() {
  return useForm<CreateFolderSchemaType>({
    resolver: zodResolver(CreateFolderSchema),
  });
}
