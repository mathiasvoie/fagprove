'use client';

import { addToast } from '@heroui/react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function RemoveToolForm() {
  // Get the router and search parameters from Next.js navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the tool ID from the search parameters
  const toolId = searchParams.get('uid');

  // Define the form using react-hook-form
  const form = useForm();

  // Define a function that will be called when form submission is successful
  function onFormSuccess() {
    addToast({
      title: 'Verktøyet ble slettet',
      color: 'success',
    });

    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');
    params.delete('uid');

    router.push('?' + params);
  }

  // Define a function that will be called when form submission fails
  function onFormError() {
    addToast({
      title: 'En feil oppstod',
      color: 'danger',
    });
  }

  // Define the submit handler for the form
  const SubmitHandler = form.handleSubmit(async () => {
    await axios
      .delete('/api/tools/' + toolId)
      .then(onFormSuccess)
      .catch(onFormError);
  });

  // Return the form and the submit handler
  return { ...form, SubmitHandler };
}
