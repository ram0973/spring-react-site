import {
  Avatar,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Td,
  Text,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {Person} from "../auth/models/models.ts";
import publicApi from "../../config/api-client.ts";

interface PersonCrudElementProps {
  element: Person;
}

const PersonCrudElement = ({element}: PersonCrudElementProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const onDeletePersonHandle = async (id: number) => {
    const response = await publicApi.delete(`/api/v1/person/${id}`);
    window.location.reload(); //TODO: BAD THING
    if (response.status == 200) {
    }
  }

  const onChangeEnabledPersonHandle = async (id: number, enabled: boolean) => {
    const response = await publicApi.patch(`/api/v1/person/${id}/enable`, enabled);
    if (response.status == 200) {
    }
  }

  return (
    <Tr key={element.id}>
      <Td>{element.id}</Td>
      <Td><HStack><Avatar size="sm" name={element.email}/><Text>{element.email}</Text></HStack></Td>
      <Td><Switch id='isEnabled' isChecked={element.enabled} onClick={() => {
        onChangeEnabledPersonHandle(element.id, element.enabled);
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
              Are you sure to delete {element.id}? You can just disable it.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
              <Button data-key={element.id} colorScheme='red'
                      onClick={() => onDeletePersonHandle(element.id)}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ViewIcon style={{cursor: 'pointer'}}/>
      </HStack></Td>
    </Tr>
  );
};

export default PersonCrudElement;