'use client';

import {
  Button,
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalContent>
        <ModalHeader>Slett mappe</ModalHeader>
        <ModalBody>
          <p className="text-sm">
            Er du sikker på at du vil slette denne mappen? Dette kan ikke
            reverseres.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="faded" onPress={handleClose}>
            Avbryt
          </Button>
          <Button color="danger">Slett</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
