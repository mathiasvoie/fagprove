'use client';

import axios from 'axios';

import { useForm } from 'react-hook-form';

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

export default function RemoveFolderModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  const isOpen = prompt === 'remove' && type === 'folder' && !!uid;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('prompt');
    params.delete('type');
    params.delete('uid');

    router.push('?' + params);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    const response = await axios.delete('/api/folders/' + uid);

    if (response.status === 200) {
      handleClose();
      return;
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
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
