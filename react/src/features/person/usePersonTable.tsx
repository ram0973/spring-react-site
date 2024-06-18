import {useQuery} from "@tanstack/react-query";
import {Person} from "../auth/models/models.ts";
import publicApi from "../../config/api-client.ts";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar, Box,
  Button,
  CloseButton, Flex, Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch, Table, TableCaption, TableContainer, Tbody,
  Td,
  Text, Tfoot, Th, Thead,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import React from "react";

function Persons() {

  const [display, setDisplay] = React.useState('none');

  function showMessage() {
    setDisplay('flex');
  }

  function closeMessage() {
    setDisplay('none');
  }


  const onDeletePersonHandle = async (id: number) => {
    const response = await publicApi.delete(`/api/v1/person/${id}`);
    if (response.status == 200) {
      showMessage();
    }
  }

  const onChangeEnabledPersonHandle = (id: number, enabled: boolean) => {
    const response = publicApi.patch(`/api/v1/person/${id}/enable`, enabled);
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await publicApi.get('/api/v1/person/all');
      return await response.data;
    }
  });
  const {isOpen, onOpen, onClose} = useDisclosure();


  if (isPending) {
    return <Tr><Td>Loading...</Td></Tr>
  }

  if (isError) {
    return <Tr><Td>Error: {error.message}</Td></Tr>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // We can assume by this point that `isSuccess === true`

  return (
    <>
      <Alert status='success' display={display} variant='solid'>
      <AlertIcon/>
      <AlertTitle>Welcome!!!</AlertTitle>
      <AlertDescription>Its nice to have you here</AlertDescription>
      <CloseButton position='absolute' top='6px' right='6px' onClick={closeMessage}/>
    </Alert><Box shadow={"dm"} rounded={"md"} m={32} w={"100%"}>
      <Flex px={5} justifyContent={"space-between"} mb={5} alignItems={"center"}>
        <Heading>Person list</Heading>
        <Button colorScheme={"blue"} leftIcon={<AddIcon/>}>Add Person</Button>
      </Flex>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>Users of this site</TableCaption>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {data.person.map((person: Person) => (
              <>
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
                  </HStack></Td></Tr>
              </>
            ))}
          </Tbody>
          <Tfoot><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr></Tfoot>
        </Table>
      </TableContainer>
    </Box>

    </>
  )
}

export {Persons}