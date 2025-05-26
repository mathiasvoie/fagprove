'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

export default function CreateFolderModal() {
  return (
    <Modal isOpen size="lg">
      <ModalContent>
        <ModalHeader>Opprett fil</ModalHeader>
        <ModalBody>test</ModalBody>
        <ModalFooter>
          <Button variant="faded">Cancel</Button>
          <Button color="primary">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
