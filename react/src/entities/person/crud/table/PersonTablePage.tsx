import {
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons";
import React from "react";
import {PersonTableRows} from "./PersonTableRows.tsx";
import Pagination from "@choc-ui/paginator";
import {useGetPersons} from "./useGetPersons.ts";

export const PersonTablePage: React.FC = () => {
  const query = useGetPersons();
  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"}>
        <Heading size={"lg"}>Persons</Heading>
        <Link to={"/admin/persons/create"}><Button colorScheme='twitter'><AddIcon/>Add person</Button></Link>
      </HStack>
      <TableContainer w={"max-content"}>
        <Table variant='striped'>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {query ? "123" : "256"}
            <PersonTableRows/>
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  )
}
