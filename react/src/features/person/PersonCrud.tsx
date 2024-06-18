import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {Person} from "../auth/models/models.ts";
import PersonCrudElement from "./PersonCrudElement.tsx";
import {useQuery} from "@tanstack/react-query";
import publicApi from "../../config/api-client.ts";


const PersonCrud = () => {
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await publicApi.get('/api/v1/person/all');
      return await response.data;
    }
  });

  if (isPending) {
    return <Tr><Td>Loading...</Td></Tr>
  }

  if (isError) {
    return <Tr><Td>Error: {error.message}</Td></Tr>
  }

  return (
    <><Alert status='success' display={display} variant='solid'>
      <AlertIcon/>
      <AlertTitle>Welcome!!!</AlertTitle>
      <AlertDescription>Its nice to have you here</AlertDescription>
      <CloseButton position='absolute' top='6px' right='6px' onClick={closeMessage}/>
    </Alert><TableContainer>
      <Table variant='striped'>
        <TableCaption>Users of this site</TableCaption>
        <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
        <Tbody>
          {data.person.map((person: Person) => (
            <PersonCrudElement id={person.id} email={person.email} enabled={person.enabled}/>))}
        </Tbody>
        <Tfoot>
          <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr>
        </Tfoot>
      </Table>
    </TableContainer></>
  );
};

export default PersonCrud;

