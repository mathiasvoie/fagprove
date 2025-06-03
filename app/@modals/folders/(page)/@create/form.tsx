import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateFolderSchema,
  CreateFolderSchemaType,
} from '@/app/schemas/CreateFolder';
import { useState } from 'react';
import { addToast } from '@heroui/react';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateFolderForm() {
  // Use the useRouter hook to get the router instance
  const router = useRouter();
  // Use the useSearchParams hook to get the search parameters from the URL
  const searchParams = useSearchParams();

  // Initialize the form with the CreateFolderSchema
  const form = useForm<CreateFolderSchemaType>({
    resolver: zodResolver(CreateFolderSchema),
  });

  // Initialize state for the image file
  const [image, setImage] = useState<File | undefined>();

  // Define success handler for the form submission
  function onFormSuccess() {
    // Create a parameter object which can be changed.
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    // Push the client to the new URL with the updated parameters
    router.push('?' + params);

    // Reset the form and image state
    setImage(undefined);
    form.reset();

    // Add a success toast notification
    addToast({
      title: 'Opprettet mappe',
      color: 'success',
    });
  }

  // Define error handler for the form submission
  function onFormError(error: AxiosError) {
    // Check if the error is a conflict error (409)
    if (error.response?.status === 409) {
      addToast({
        title: 'Navnet er allerede i bruk',
        color: 'danger',
      });
      return;
    }

    // Push a toast notification for any other error
    addToast({
      title: 'Noe gikk galt',
      color: 'danger',
    });
  }

  // Create a SubmitHandler that uses the form's handleSubmit method
  const SubmitHandler = form.handleSubmit(async (data) => {
    // Create formdata object
    const formData = new FormData();

    // Append all data to the formData object
    formData.append('name', data.name);
    formData.append('description', data?.description || '');

    // If an image is selected, append it to the formData
    if (image) {
      formData.append('image', image);
    }

    // Send the request to the server using axios
    await axios
      .post('/api/folders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(onFormSuccess)
      .catch(onFormError);
  });

  // Return the form and the SubmitHandler
  return { ...form, SubmitHandler };
}
