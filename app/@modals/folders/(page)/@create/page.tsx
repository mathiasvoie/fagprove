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
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => setImage(null)}
                  >
                    Fjern
                  </Button>
                </div>
              )}
            </span>
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
