import {useGetPersons} from "./useGetPersons.ts";
import {Flex, Td, Tr} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {Person} from "../../model/Person.ts";
import {PersonTableRow} from "./PersonTableRow.tsx";
import React from "react";
import Pagination from "@choc-ui/paginator";

export const PersonTableRows: React.FC = () => {

  const query = useGetPersons();

  if (query.isPending) {
    return (<Tr><Td>Loading...</Td></Tr>)
  }

  if (query.isError) {
    return (<Tr><Td>Error: {(query.error as AxiosError).message}</Td></Tr>)
  }

  return (<>
    {query.data.persons.map((person: Person) => <PersonTableRow person={person} key={person.id} />)}
    <Flex bg={"gray.400"} _dark={{ bg: "gray.400", }} p={1} alignItems="center" justifyContent="center">
      {/*int currentPage, long totalItems, int totalPages*/}
      <Pagination defaultCurrent={query.data.currentPage} total={query.data.totalItems} paginationProps={{ display: "flex", }}/>
    </Flex>
    </>);
}