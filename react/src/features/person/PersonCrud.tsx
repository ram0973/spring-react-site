import {Table, TableCaption, TableContainer, Tbody, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import PersonCrudElements from "./PersonCrudElements.tsx";
import AlertSuccessMessage from "./AlertSuccessMessage.tsx";

const PersonCrud = () => {
  return (
    <>
      <AlertSuccessMessage/>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>Users of this site</TableCaption>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            <PersonCrudElements/>
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

