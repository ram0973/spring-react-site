import {
  Avatar, Button,
  HStack,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Td,
  Text, Tr, useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {Person} from "../auth/models/models.ts";
import React from "react";
import publicApi from "../../config/api-client.ts";

const PersonCrudElement = (person: Person) => {
  const {isOpen, onOpen, onClose} = useDisclosure();




  const onDeletePersonHandle = async (id: number) => {
    const response = await publicApi.delete(`/api/v1/person/${id}`);
    if (response.status == 200) {
      showMessage();
    }
  }

  const onChangeEnabledPersonHandle = (id: number, enabled: boolean) => {
    const response = publicApi.patch(`/api/v1/person/${id}/enable`, enabled);
  }


  return (
    <Tr key={person.id}>
      <Td>{person.id}</Td>
      <Td><HStack><Avatar size="sm" name={person.email}/><Text>{person.email}</Text></HStack></Td>
      <Td><Switch id='isEnabled' isChecked={person.enabled} onClick={() => {
        onChangeEnabledPersonHandle(person.id, person.enabled);
      }} style={{cursor: 'pointer'}}/></Td>
      <Td><HStack>
        <EditIcon style={{cursor: 'pointer'}}/>
        <DeleteIcon onClick={onOpen} style={{cursor: 'pointer'}}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Delete Person</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              Are you sure to delete person? You can just disable it.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={() => {
                onDeletePersonHandle(person.id);
              }}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ViewIcon style={{cursor: 'pointer'}}/>
      </HStack></Td>
    </Tr>
  );
}

export default PersonCrudElement;