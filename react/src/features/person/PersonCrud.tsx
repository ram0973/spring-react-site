import {Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import PersonCrudElement from "./PersonCrudElement.tsx";
import Person from "../../features/auth/models/models.ts"
const person: Person = {
  id: 1,
  email: "email",
  enabled: true
};
const PersonCrud = () => {

  // const {isPending, isError, data, error} = useQuery({
  //   queryKey: ['persons'],
  //   queryFn: async () => {
  //     const response = await publicApi.get('/api/v1/person/all');
  //     return await response.data.person;
  //   }
  // });
  //
  // if (isPending) {
  //   return <Tr><Td>Loading...</Td></Tr>
  // }
  //
  // if (isError) {
  //   return <Tr><Td>Error: {error.message}</Td></Tr>
  // }



  return (
    <TableContainer>
      <Table variant='striped'>
        <TableCaption>Users of this site</TableCaption>
        <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
        <Tbody>
          {
            <PersonCrudElement element={person}/>
          }
        </Tbody>
        <Tfoot>
          <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default PersonCrud;

