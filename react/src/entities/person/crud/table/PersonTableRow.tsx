import {Avatar, HStack, Switch, Td, Text, Tr, useDisclosure} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useToast} from "@chakra-ui/toast";
import React from "react";
import {Link} from "react-router-dom";
import {useDeletePerson} from "../delete/useDeletePerson.ts";
import {Person} from "../../model/Person.ts";
import {PersonDeleteModal} from "./PersonDeleteModal.tsx";


type PersonTableRowProps = {
  person: Person,
}

export const PersonTableRow: React.FC<PersonTableRowProps> = ({person}) => {
  const deleteModalDisclosure = useDisclosure();
  const deleteMutation = useDeletePerson();

  async function deletePersonHandle(id: number) {
    deleteModalDisclosure.onClose();
    try {
      event.preventDefault()
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Tr key={person.id}>
      <Td>{person.id}</Td>
      <Td><HStack><Avatar size="sm" name={person.email}/><Text>{person.email}</Text></HStack></Td>
      <Td><Switch disabled id='isEnabled' isChecked={person.enabled} style={{cursor: 'pointer'}}/></Td>
      <Td><HStack>
        <Link to={`/admin/persons/update/${person.id}`}><EditIcon style={{cursor: 'pointer'}}/></Link>
        <DeleteIcon onClick={deleteModalDisclosure.onOpen} style={{cursor: 'pointer'}}/>
        <PersonDeleteModal isOpen={deleteModalDisclosure.isOpen} onClose={deleteModalDisclosure.onClose}
                           email={person.email} dataKey={person.id} onClick={(event) => deletePersonHandle(event, person.id)}/>
        <Link to={`/admin/persons/${person.id}`}><ViewIcon style={{cursor: 'pointer'}}/></Link>
      </HStack></Td>
    </Tr>
  );
}
