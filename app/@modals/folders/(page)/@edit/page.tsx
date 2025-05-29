'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function EditFolderModal() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const prompt = searchParams.get('prompt');
  const type = searchParams.get('type');

  const isOpen = prompt === 'edit' && type === 'folder' && !!uid;

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
        <ModalHeader>Rediger mappe</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            label="Navn"
            placeholder="Skiftnøkkeler, fastnøkkler..."
            className="text-sm"
          />
          <Textarea
            label="Beskrivelse"
            className="text-sm"
            placeholder="Din beskrivelse her..."
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="faded" onPress={handleClose}>
            Avbryt
          </Button>
          <Button color="primary">Lagre endringer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
