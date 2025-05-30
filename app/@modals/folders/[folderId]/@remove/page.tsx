'use client';

import RemoveToolForm from './form';

import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function RemoveToolModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');
  const uid = searchParams.get('uid');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    router.push('?' + params);
  };

  const isOpen = prompt === 'remove' && !!uid && type === 'tool';

  const {
    SubmitHandler,
    formState: { isSubmitting },
  } = RemoveToolForm();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      isDismissable={!isSubmitting}
    >
      <Form onSubmit={SubmitHandler}>
        <ModalContent>
          <ModalHeader>Slett verktøy</ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Er du sikker på at du vil slette dette verktøyet? Dette kan ikke
              reverseres.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              isDisabled={isSubmitting}
              variant="faded"
              onPress={handleClose}
            >
              Avbryt
            </Button>
            <Button type="submit" color="danger" isLoading={isSubmitting}>
              Slett
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
}
