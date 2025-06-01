'use client';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import {
  CreateToolSchema,
  CreateToolSchemaType,
} from '@/app/schemas/CreateTool';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { addToast, Button } from '@heroui/react';

export default function CreateToolForm() {
  // Use the useSearchParams hook to get the search parameters from the URL
  const searchParams = useSearchParams();

  // Use the useRouter hook to get the router instance
  const router = useRouter();

  // Use the useParams hook to get the folderId from the URL
  const params = useParams();

  // Unpack params from params object
  const { folderId } = params;

  // Initialize state for the image file
  const [image, setImage] = useState<File | undefined>();

  // Initialize the form with the CreateToolSchema
  const form = useForm<CreateToolSchemaType>({
    resolver: zodResolver(CreateToolSchema),
  });

  // Define success handler for the form submission
  function onFormSuccess() {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    router.push('?' + params);

    setImage(undefined);
    form.reset();
  }

  // Define error handler for the form submission
  function onFormError() {
    addToast({
      title: 'Noe gikk galt',
      color: 'danger',
    });
  }

  // Create a SubmitHandler that uses the form's handleSubmit method
  const SubmitHandler = form.handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data?.description as string);
    formData.append('folderId', folderId as string);
    formData.append('image', image as File);

    await axios
      .post('/api/tools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(onFormSuccess)
      .catch(onFormError);
  });

  // Create the image input component
  const imageInput = (
    <span className="flex flex-col w-full gap-1">
      <p className="text-sm">Banner</p>
      {!image ? (
        <label className="rounded-xl border-[2px] border-spacing-2 border-dotted p-6 flex border-blue-600 cursor-pointer hover:bg-gray-200 transition-all items-center justify-center">
          <span className="flex items-center gap-1">
            <svg
              className="fill-blue-600"
              width={16}
              height={16}
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <p className="text-sm text-blue-600">Legg ved bilde</p>
          </span>
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      ) : (
        <div className="mt-2 w-full justify-between flex items-center gap-2">
          <span className="flex items-center gap-2">
            <img
              draggable={false}
              src={URL.createObjectURL(image)}
              alt="Valgt bilde"
              className="h-12 w-12 object-cover rounded"
            />
            <span className="text-xs">{image.name}</span>
          </span>
          <Button size="sm" variant="ghost" onPress={() => setImage(undefined)}>
            Fjern
          </Button>
        </div>
      )}
    </span>
  );

  // Package the form and SubmitHandler together so you dont have to import them both.
  return { ...form, SubmitHandler, imageInput };
}
