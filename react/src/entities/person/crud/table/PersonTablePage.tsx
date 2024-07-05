import {Button, Heading, HStack, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons";
import React from "react";
import {PersonTableRows} from "./PersonTableRows.tsx";

export const PersonTablePage: React.FC = () => {
  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"}>
        <Heading size={"lg"}>Persons</Heading>
        <Button colorScheme='twitter'><Link to={"/admin/persons/create"}><AddIcon/> Add person</Link></Button>
      </HStack>
      <TableContainer w={"max-content"}>
        <Table variant='striped'>
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            <PersonTableRows/>
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th></Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  )
}
