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

type ArticleDeleteModalProps = {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  dataKey: number,
  onClick: () => Promise<void>
}

export const ArticleDeleteModal: React.FC<ArticleDeleteModalProps> =
  ({isOpen, onClose, title, dataKey, onClick}) => {

    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          Delete Article
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          Are you sure to delete article {title}?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>Cancel</Button>
          <Button data-key={dataKey} colorScheme="red" onClick={onClick}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>;
  }
