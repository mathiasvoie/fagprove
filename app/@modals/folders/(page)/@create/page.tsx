'use client';

import CreateFolderForm from './form';

import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateFolderModal() {
  // Use the useRouter hook to get the router instance
  const router = useRouter();

  // Use the useSearchParams hook to get the search parameters from the URL
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  // Check if the modal should be open
  const isOpen = prompt === 'create' && type === 'folder';

  // Initialize the form using the CreateFolderForm component
  const {
    register,
    SubmitHandler,
    reset,
    formState: { isSubmitting, errors },
  } = CreateFolderForm();

  // Define a function to handle closing the modal
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');
    reset();

    router.push('?' + params);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      isDismissable={!isSubmitting}
    >
      <Form onSubmit={SubmitHandler}>
        <ModalContent>
          <ModalHeader>Opprett mappe</ModalHeader>
          <ModalBody>
            <Input
              classNames={{
                label: 'text-black',
              }}
              autoFocus
              isDisabled={isSubmitting}
              errorMessage={errors?.name?.message}
              isInvalid={!!errors?.name}
              {...register('name')}
              labelPlacement="outside"
              label="Navn"
              placeholder="Skiftnøkkeler, fastnøkkler..."
              className="text-sm"
            />
            <Textarea
              classNames={{
                label: 'text-black',
              }}
              isDisabled={isSubmitting}
              errorMessage={errors?.description?.message}
              isInvalid={!!errors?.description}
              {...register('description')}
              label="Beskrivelse"
              labelPlacement="outside"
              className="text-sm"
              placeholder="Din beskrivelse her..."
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={isSubmitting}
              type="button"
              variant="faded"
              onPress={handleClose}
            >
              Avbryt
            </Button>
            <Button isLoading={isSubmitting} color="primary" type="submit">
              Opprett
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
}
