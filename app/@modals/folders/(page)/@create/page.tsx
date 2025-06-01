'use client';

import axios from 'axios';

import CreateFolderForm from './form';

import {
  addToast,
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

import { useState } from 'react';

export default function CreateFolderModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  const isOpen = prompt === 'create' && type === 'folder';

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = CreateFolderForm();

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data?.description || '');

    if (image) {
      formData.append('image', image);
    }

    const response = await axios
      .post('/api/folders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch((error) => error);

    const responseData = response.response?.data;

    if (axios.isAxiosError(response)) {
      if (responseData === 'Folder name already exists.')
        addToast({
          title: 'Navnet er allerede i bruk',
          color: 'danger',
        });
      return;
    }

    if (response.status === 200) {
      handleClose();
      addToast({
        title: 'Opprettet mappe',
        color: 'success',
      });

      return;
    }

    addToast({
      title: 'En feil oppstod',
      description: 'Kunne ikke opprette mappen. Vennligst prøv igjen senere.',
      color: 'danger',
    });
  });

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    setImage(null);
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
      <Form onSubmit={onSubmit}>
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
