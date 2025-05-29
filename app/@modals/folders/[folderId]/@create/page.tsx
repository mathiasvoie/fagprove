'use client';

import CreateToolForm from './form';

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

export default function CreateToolModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    router.push('?' + params);
  };

  const isOpen = prompt === 'create' && type === 'tool';

  const {
    register,
    SubmitHandler,
    imageInput,
    formState: { errors, isSubmitting },
  } = CreateToolForm();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      isDismissable={!isSubmitting}
    >
      <Form onSubmit={SubmitHandler}>
        <ModalContent>
          <ModalHeader>Legg til verktøy</ModalHeader>
          <ModalBody>
            <Input
              {...register('name')}
              autoFocus
              labelPlacement="outside"
              placeholder="Skrujern..."
              isDisabled={isSubmitting}
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
              label="Navn"
            />
            <Textarea
              {...register('description')}
              labelPlacement="outside"
              placeholder="Din beskrivelse her..."
              isDisabled={isSubmitting}
              isInvalid={!!errors?.description}
              errorMessage={errors?.description?.message}
              label="Beskrivelse"
            />
            {imageInput}
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={handleClose}
              isDisabled={isSubmitting}
              variant="light"
            >
              Avbryt
            </Button>
            <Button type="submit" isLoading={isSubmitting} color="primary">
              Opprett
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
}
