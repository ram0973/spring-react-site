import React from 'react';
import {useGetArticle} from "./useGetArticle.ts";
import {useParams} from "react-router-dom";
import {Box} from "@chakra-ui/react";

export const ArticleViewPage: React.FC = () => {
  const {id} = useParams();
  if (!id) {
    throw("Error");
  }
  const query = useGetArticle(Number(id));

  if (query.isPending) {
    return ("Loading...")
  }

  if (query.isError) {
    return ("Error: {(query.error as AxiosError).message}")
  }

  return <>
    <Box>{query.data.id}</Box>
    <Box>{query.data.title}</Box>
    <Box>{query.data.enabled.toString()}</Box>
  </>
};
