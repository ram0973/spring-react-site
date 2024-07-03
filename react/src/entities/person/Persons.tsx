import {Table, Heading, TableContainer, Tbody, Tfoot, Th, Thead, Tr, Button, Td} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useGetPersons} from "./service/queries.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import PersonRow from "./PersonRow.tsx";
import {Person} from "./model/Person.ts";


export default function Persons () {
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
}

const PersonRows = () => {
  const query = useGetPersons();

  if (query.isPending) {
    return (<Tr><Td>Loading...</Td></Tr>)
  }

  if (query.isError) {
    return (<Tr><Td>Error: {error.message}</Td></Tr>)
  }

  return (
    query.data.map((person: Person, index: number) => {
        return (
          <PersonRow person={person} key={index}/>
        )
      }
    )
  )
}
