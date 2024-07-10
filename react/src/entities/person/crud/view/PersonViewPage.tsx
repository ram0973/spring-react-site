import React from 'react';
import {useGetPerson} from "./useGetPerson.ts";
import {useParams} from "react-router-dom";
import {Box} from "@chakra-ui/react";

export const PersonViewPage: React.FC = () => {
  const {id} = useParams();
  if (!id) {
    throw("Error");
  }
  const query = useGetPerson(Number(id));

  if (query.isPending) {
    return ("Loading...")
  }

  if (query.isError) {
    return ("Error: {(query.error as AxiosError).message}")
  }

  return <>
    <Box>{query.data.id}</Box>
    <Box>{query.data.email}</Box>
    <Box>{query.data.enabled.toString()}</Box>
  </>
};
