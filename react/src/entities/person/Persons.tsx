import {
  Button,
  Heading,
  HStack,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useGetPersons} from "./service/queries.ts";
import {Simulate} from "react-dom/test-utils";
import PersonRow from "./PersonRow.tsx";
import {Person} from "./model/Person.ts";
import {AddIcon} from "@chakra-ui/icons";
import error = Simulate.error;


export default function Persons() {
  return (
    <>
      <VStack flexGrow={1}>
        <HStack justifyContent={"space-between"}>
          <Heading size={"lg"}>Persons</Heading>
          <Button colorScheme='twitter'><Link to={"/admin/persons/add"}><AddIcon/> Add person</Link></Button>
        </HStack>
        <TableContainer w={"max-content"}>
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
      </VStack>
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
