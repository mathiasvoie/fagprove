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

export default function CreateFolderModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  const isOpen = prompt === 'create' && type === 'folder';

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    router.push('?' + params);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = CreateFolderForm();

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post('/api/folders', { ...data });

    if (response.status === 200) {
      handleClose();
      addToast({
        title: 'Opprettet mappe',
        color: 'success',
      });
      reset();
      return;
    }

    addToast({
      title: 'En feil oppstod',
      description: 'Kunne ikke opprette mappen. Vennligst prøv igjen senere.',
      color: 'danger',
    });
  });

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
              <div className="rounded-xl border-[2px] border-spacing-2 border-dotted p-6 flex border-blue-600 cursor-pointer hover:bg-gray-200 transition-all items-center justify-center">
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
              </div>
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
