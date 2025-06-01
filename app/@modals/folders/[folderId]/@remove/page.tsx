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
  // Use the useRouter hook to get the router instance
  const router = useRouter();
  // Use the useSearchParams hook to get the search parameters from the URL
  const searchParams = useSearchParams();

  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');
  const uid = searchParams.get('uid');

  // Check if the modal should be open
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');

    router.push('?' + params);
  };

  // Initialize the form using the RemoveToolForm component
  const isOpen = prompt === 'remove' && !!uid && type === 'tool';

  // Use the RemoveToolForm to get the form methods
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
