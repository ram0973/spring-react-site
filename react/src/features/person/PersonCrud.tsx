import {Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {Person} from "../auth/models/models.ts";
import PersonCrudElement from "./PersonCrudElement.tsx";
import {useQuery} from "@tanstack/react-query";
import publicApi from "../../config/api-client.ts";
import {useState} from "react";

const PersonCrud = (onShowMessage: () => void) => {

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await publicApi.get('/api/v1/person/all');
      return await response.data.person;
    }
  });

  if (isPending) {
    return <Tr><Td>Loading...</Td></Tr>
  }

  if (isError) {
    return <Tr><Td>Error: {error.message}</Td></Tr>
  }

  const [messageState, setMessageState] = useState("none");

  return (
    <>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>Users of this site</TableCaption>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {data.forEach((person: Person) => {
              return (
                <PersonCrudElement element={person} onShowMessage={onShowMessage}/>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default PersonCrud;

