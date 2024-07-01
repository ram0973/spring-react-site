import {Table, Heading, TableContainer, Tbody, Tfoot, Th, Thead, Tr, Button} from "@chakra-ui/react";
import PersonRows from "./PersonRows.tsx";
import {Link} from "react-router-dom";

const PersonTable = () => {
  return (
    <>
      <Button colorScheme='twitter'><Link to={"/admin/persons/add"}>Admin</Link></Button>
      <Heading size={"lg"}>Persons</Heading>
      <TableContainer>
        <Table variant='striped'>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            <PersonRows/>
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

