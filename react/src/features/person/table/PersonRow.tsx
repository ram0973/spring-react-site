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
import {useToast} from "@chakra-ui/toast";
import {ReactNode} from "react";
import {Person} from "../model/Person.ts";
import axiosInstance from "../../common/axiosInstance.ts";

interface PersonCrudElementProps {
  element: Person;
  children: ReactNode
}

const PersonRow = ({element}) => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const onDeletePersonHandle = async (id: number) => {
    axiosInstance
      .delete(`/api/v1/person/${id}`)
      .then(() => {
        onClose();
        toast({
          title: "Success!",
          description: "Successfully deleted user",
        });
        //TODO : refresh table
      })
      .catch((reason) => {console.error(reason)})
  }

  return (
    <Tr key={element.id}>
      <Td>{element.id}</Td>
      <Td><HStack><Avatar size="sm" name={element.email}/><Text>{element.email}</Text></HStack></Td>
      <Td><Switch disabled id='isEnabled' isChecked={element.enabled} style={{cursor: 'pointer'}}/></Td>
      <Td><HStack>
        <EditIcon style={{cursor: 'pointer'}}/>
        <DeleteIcon onClick={onOpen} style={{cursor: 'pointer'}}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Delete Person</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              Are you sure to delete user {element.email}?
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

export default PersonRow;