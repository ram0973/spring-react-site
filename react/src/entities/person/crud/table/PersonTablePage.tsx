import {
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody, Td,
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
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Person} from "../../model/Person.ts";
import {PersonTableRow} from "./PersonTableRow.tsx";

export const PersonTablePage: React.FC = () => {
  const [page, setPage] = React.useState(0)

  const getPersonsApi = async (page: number) => {
    return (await axiosInstance.get('/api/v1/persons?page=' + page)).data;
  }

  function useGetPersons() {
    return useQuery({
      queryKey: ["persons", page],
      queryFn: () => getPersonsApi(page),
      placeholderData: keepPreviousData,
    })
  }

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
            { query.isPending ? <Tr><Td>Loading...</Td></Tr> :
              query.isError ? <Tr><Td>Error: {(query.error as AxiosError).message}</Td></Tr> :
              query.data.persons.map((person: Person) => <PersonTableRow person={person} key={person.id} />)
            }
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Actions</Th></Tr>
          </Tfoot>
        </Table>
        <Flex bg={"gray.100"} p={2} alignItems="center" justifyContent="center">
          {/*int currentPage, long totalItems, int totalPages*/}
          <Pagination defaultCurrent={query.data?.currentPage} total={query.data?.totalItems}
                      paginationProps={{ display: "flex", }} pageNeighbours={2} currentPage={page} setCurrentPage={setPage}/>
          <span>Current Page: {page + 1}</span>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </button>{' '}
          <button
            onClick={() => {
              if (!query.isPlaceholderData && query.data.totalPages > page) {
                setPage((old) => old + 1)
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={query.isPlaceholderData || !query.data?.hasMore}
          >
            Next Page
          </button>
          {query.isFetching ? <span> Loading...</span> : null}{' '}
        </Flex>
      </TableContainer>
    </VStack>
  )
}
