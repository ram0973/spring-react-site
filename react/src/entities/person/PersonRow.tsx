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

import {Person} from "./model/Person.ts";
import {useDeletePerson} from "./service/mutations.ts";
import React from "react";
import {Link} from "react-router-dom";

function PersonDeleteModal(props: {
  open: boolean,
  onClose: () => void,
  email: string,
  dataKey: any,
  onClick: () => Promise<void>
}) {
  return <Modal isOpen={props.open} onClose={props.onClose}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Delete Person</ModalHeader>
      <ModalCloseButton/>
      <ModalBody>
        Are you sure to delete user {props.email}?
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={props.onClose}>Cancel</Button>
        <Button data-key={props.dataKey} colorScheme="red"
                onClick={props.onClick}>Delete</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}

type Props = {
  person: Person
}

const PersonRow: React.FC<Props> = ({person}: Props) => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const deleteUserMutation = useDeletePerson();

  async function onDeletePersonHandle(id: number) {
    onClose();
    try {
      await deleteUserMutation.mutateAsync(id);
      toast({
        title: "Success!",
        description: "Successfully deleted person",
      });
    } catch (e) {
      toast({
        title: "Error!",
        description: "Error when delete person",
        status: "error",
      });
    }
  }

  return (
    <Tr key={person.id}>
      <Td>{person.id}</Td>
      <Td><HStack><Avatar size="sm" name={person.email}/><Text>{person.email}</Text></HStack></Td>
      <Td><Switch disabled id='isEnabled' isChecked={person.enabled} style={{cursor: 'pointer'}}/></Td>
      <Td><HStack>
        <Link to={`/admin/persons/update/${person.id}`}><EditIcon style={{cursor: 'pointer'}}/></Link>
        <DeleteIcon onClick={onOpen} style={{cursor: 'pointer'}}/>
        <PersonDeleteModal open={isOpen} onClose={onClose} email={person.email} dataKey={person.id}
                           onClick={() => onDeletePersonHandle(person.id)}/>
        <ViewIcon style={{cursor: 'pointer'}}/>
      </HStack></Td>
    </Tr>
  );
};

export default PersonRow;