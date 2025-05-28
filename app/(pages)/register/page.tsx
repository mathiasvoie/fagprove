'use client';

import axios from 'axios';

import RegisterForm from './form';

import { Button, Form, Input } from '@heroui/react';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  // Initialize the Next.js router to handle navigation after form submission.
  const router = useRouter();

  // Export of react-hook-form useForm into custom wrapped hook.
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = RegisterForm();

  // When the form is submitted, i send a POST request to the register API endpoint with the form data.
  const onSubmit = handleSubmit(async (data) => {
    // This is the post request with the data.
    await axios
      .post('/api/auth/register', {
        ...data,
      })
      // All successful responses from the API request ends up here.
      .then((response) => {
        if (response.status === 200) {
          // Push the user to the login page with a login hint for easy of access
          router.push('/login?login_hint=' + data.email);
          return;
        }
      })
      // All errors from the API request ends up here.
      .catch((error) => {
        // If the response status is 409, it means the email is already registered.
        if (error.status === 409) {
          setError('email', {
            message: 'E-postadressen er allerede registrert.',
          });
        }

        // Any other error that is not handled above will be set as a root error.
        setError('root', { message: 'Noe gikk galt, prøv igjen senere.' });
      });
  });

  return (
    <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <>
        <Input
          autoFocus
          labelPlacement="outside"
          // Here we check if there are any errors related to the name field.
          isInvalid={!!errors?.name}
          // If there are errors related to the name field, we display the error message.
          errorMessage={errors?.name?.message}
          // If the form is currently being submitted, we disable the input field.
          isDisabled={isSubmitting}
          placeholder="Ola Nordmann"
          {...register('name')}
          label="Navn"
          className="flex w-full"
        />
      </>
      <>
        <Input
          {...register('email')}
          labelPlacement="outside"
          isInvalid={!!errors?.email}
          // Here we check if there are any errors related to the name field.
          errorMessage={errors?.email?.message}
          // If there are errors related to the name field, we display the error message.
          isDisabled={isSubmitting}
          // If the form is currently being submitted, we disable the input field.
          placeholder="abc@eksempel.no"
          label="Brukernavn"
          className="flex w-full"
        />
      </>
      <>
        <Input
          {...register('password')}
          labelPlacement="outside"
          isInvalid={!!errors?.password}
          // Here we check if there are any errors related to the name field.
          errorMessage={errors?.password?.message}
          // If there are errors related to the name field, we display the error message.
          isDisabled={isSubmitting}
          // If the form is currently being submitted, we disable the input field.
          placeholder="********"
          type="password"
          label="Passord"
          className="flex w-full"
        />
      </>
      <>
        <Input
          {...register('confirm_password')}
          placeholder="********"
          isInvalid={!!errors?.confirm_password}
          // Here we check if there are any errors related to the name field.
          errorMessage={errors?.confirm_password?.message}
          // If there are errors related to the name field, we display the error message.
          isDisabled={isSubmitting}
          // If the form is currently being submitted, we disable the input field.
          labelPlacement="outside"
          label="Bekreft passord"
          type="password"
          className="flex w-full"
        />
      </>
      <>
        {/* Om det skulle oppstå noen uhåndterte feilmeldinger til formen vil meldingen bli vist her. */}
        {errors?.root && (
          <>
            <p className="text-red-500 text-sm">{errors?.root?.message}</p>
          </>
        )}
      </>
      <>
        <section className="flex w-full items-center justify-end">
          <>
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Registrer bruker
            </Button>
          </>
        </section>
      </>
    </Form>
  );
}
