import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

type PersonDeleteModalProps = {
  isOpen: boolean,
  onClose: () => void,
  email: string,
  dataKey: number,
  onClick: () => Promise<void>
}

export const PersonDeleteModal: React.FC<PersonDeleteModalProps> =
  ({isOpen, onClose, email, dataKey, onClick}) => {

    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          Delete Person
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          Are you sure to delete user {email}?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>Cancel</Button>
          <Button data-key={dataKey} colorScheme="red" onClick={onClick}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>;
  }
