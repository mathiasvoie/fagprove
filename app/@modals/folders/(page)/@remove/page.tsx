'use client';

import axios from 'axios';

import { useForm } from 'react-hook-form';

import {
  addToast,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function RemoveFolderModal() {
  // Use the useRouter hook to get the router instance
  const router = useRouter();

  // Use the useSearchParams hook to get the search parameters from the URL
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  // Check if the modal should be open
  const isOpen = prompt === 'remove' && type === 'folder' && !!uid;

  // Define a function to handle closing the modal
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');
    params.delete('uid');

    router.push('?' + params);
  };

  // Initialize the form using react-hook-form
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // Define a function to handle form submission
  const onSubmit = handleSubmit(async () => {
    const response = await axios.delete('/api/folders/' + uid);

    if (response.status === 200) {
      handleClose();
      addToast({
        title: 'Slettet mappe',
        color: 'success',
      });
      return;
    }

    addToast({
      title: 'En feil oppstod',
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
          <ModalHeader>Slett mappe</ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Er du sikker på at du vil slette denne mappen? Dette kan ikke
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
