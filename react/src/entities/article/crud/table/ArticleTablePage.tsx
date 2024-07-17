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
import {ArticleTableRow} from "./ArticleTableRow.tsx";


export const ArticleTablePage: React.FC = () => {
  const [page, setPage] = React.useState(0)

  const getArticlesApi = async (page: number) => {
    return (await axiosInstance.get('/api/v1/articles?page=' + page)).data;
  }

  function useGetArticles() {
    return useQuery({
      queryKey: ["articles", page],
      queryFn: () => getArticlesApi(page),
      placeholderData: keepPreviousData,
    })
  }

  const query = useGetArticles();

  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"}>
        <Heading size={"lg"}>Articles</Heading>
        <Link to={"/admin/articles/create"}><Button colorScheme='twitter'><AddIcon/>Add article</Button></Link>
      </HStack>
      <TableContainer w={"max-content"}>
        <Table variant='striped'>
          <Thead><Tr><Th>Id</Th><Th>Title</Th><Th>Enabled</Th><Th>Created</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            { query.isPending ? <Tr><Td><Spinner/></Td></Tr> :
              query.isError ? <Tr><Td>Error: {(query.error as AxiosError).message}</Td></Tr> :
                query.data.articles.map((article: Article) => <ArticleTableRow article={article} key={article.id} />)
            }
          </Tbody>
          <Tfoot>
            <Tr><Th>Id</Th><Th>Title</Th><Th>Enabled</Th><Th>Created</Th><Th>Actions</Th></Tr>
          </Tfoot>
        </Table>
        <Flex id="pagination" bg={"gray.100"} p={2} alignItems="center" justifyContent="center">
          {/* data: articles[], int currentPage, long totalItems, int totalPages*/}
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
