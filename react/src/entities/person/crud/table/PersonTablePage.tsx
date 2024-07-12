import {
  Button,
  Flex,
  Heading,
  HStack, Spinner,
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
          <Thead><Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Created</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            { query.isPending ? <Spinner/> :
              query.isError ? <Tr><Td>Error: {(query.error as AxiosError).message}</Td></Tr> :
              query.data.persons.map((person: Person) => <PersonTableRow person={person} key={person.id} />)
            }
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Email</Th><Th>Enabled</Th><Th>Created</Th><Th>Actions</Th></Tr>
          </Tfoot>
        </Table>
        <Flex bg={"gray.100"} p={2} alignItems="center" justifyContent="center">
          {/* data: persons[], int currentPage, long totalItems, int totalPages*/}
          <span>Page: {page + 1} of {query.data?.totalPages}</span>
          <Button onClick={() => setPage(0)}
                  isDisabled={!query.isPlaceholderData && page < (query.data?.totalPages - 1)}
          >
            First
          </Button>
          <Button onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  isDisabled={!query.isPlaceholderData && page < (query.data?.totalPages - 1)}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (!query.isPlaceholderData && page < (query.data?.totalPages - 1)) {
                setPage((old) => old + 1)
              }
            }}
            isDisabled={query.isPlaceholderData || page == query.data?.totalPages - 1}
          >
            Next
          </Button>
          <Button onClick={() => setPage(query.data?.totalPages - 1)}
                  isDisabled={query.isPlaceholderData || page == query.data?.totalPages - 1}
          >
            Last
          </Button>
          {query.isFetching ? <Spinner/> : ""}
        </Flex>
      </TableContainer>
    </VStack>
  )
}
