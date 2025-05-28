'use client';

import { signIn } from 'next-auth/react';
import UserLoginForm from './form';

import { Button, Form, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // Import the useRouter hook from next/navigation to handle navigation.
  const router = useRouter();

  // Import the UserLoginForm hook to manage form state and validation.
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = UserLoginForm();

  const onSubmit = handleSubmit(async (data) => {
    // Unpack values from the form data.
    const { email, password } = data;

    // Attempt to sign in with the provided credentials.
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // If the response is ok, redirect to the folders page.
    if (response?.ok) {
      router.push('/folders');
      return;
    }

    // If the response is not ok, set an error on the form.
    setError('root', {
      message: 'Feil epost eller passord.',
    });
  });

  return (
    <Form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
      <>
        <>
          <Input
            {...register('email')}
            autoFocus
            label="Email"
            isInvalid={!!errors?.email || !!errors?.root}
            // Here we check if there are any errors related to the name field.
            errorMessage={errors?.email?.message}
            // If there are errors related to the name field, we display the error message.
            isDisabled={isSubmitting}
            // If the form is currently being submitted, we disable the input field.
            labelPlacement="outside"
            placeholder="abc@eksempel.no"
            type="email"
          />
        </>
        <>
          <Input
            {...register('password')}
            label="Passord"
            isInvalid={!!errors?.password || !!errors?.root}
            // Here we check if there are any errors related to the name field.
            errorMessage={errors?.password?.message}
            // If there are errors related to the name field, we display the error message.
            isDisabled={isSubmitting}
            // If the form is currently being submitted, we disable the input field.
            labelPlacement="outside"
            placeholder="********"
            type="password"
          />
        </>
        <>
          {/* Om det skulle oppstå noen uhåndterte feilmeldinger til formen vil meldingen bli vist her. */}
          {errors?.root && (
            <>
              <p className="text-red-500 text-xs">{errors?.root?.message}</p>
            </>
          )}
        </>
        <>
          <section className="flex w-full items-center justify-end">
            <>
              <Button type="submit" color="primary">
                Logg inn
              </Button>
            </>
          </section>
        </>
      </>
    </Form>
  );
}
