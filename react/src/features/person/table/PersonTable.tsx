import {Table, Heading, TableContainer, Tbody, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import PersonTableElements from "./PersonTableElements.tsx";
import AlertSuccessMessage from "./AlertSuccessMessage.tsx";

const PersonTable = () => {
  return (
    <>
      <AlertSuccessMessage/>
      <Heading size={"lg"}>Users</Heading>
      <TableContainer>
        <Table variant='striped'>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            <PersonTableElements/>
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default PersonTable;

