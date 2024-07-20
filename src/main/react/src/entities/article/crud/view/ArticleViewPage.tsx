import React from 'react';
import {useGetArticle} from "./useGetArticle.ts";
import {useParams} from "react-router-dom";
import {Box, Flex, Heading, Image, Spinner, Text} from "@chakra-ui/react";

export const ArticleViewPage: React.FC = () => {
  const {id} = useParams();
  //if (!id) {
  //  throw("Error");
  //}
  const query = useGetArticle(id);

  if (query.isPending) {
    return <Spinner/>
  }

  if (query.isError) {
    return ("Error: {(query.error as AxiosError).message}")
  }

  return <Flex flexDirection={"column"}>
    <Box>{query.data.dateCreated}</Box>
    <Image
      //borderRadius="full"
      //boxSize="40px"
      src={query.data.image}
      alt={`post image`}
    />
    <Heading as="h2" marginTop="5">{query.data.title}</Heading>
    <Text
      as="p"
      marginTop="2"
      color={'gray.700'}
      fontSize="lg">
      {query.data.content}
    </Text>
  </Flex>
};
