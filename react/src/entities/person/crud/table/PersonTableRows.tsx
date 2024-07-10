import {Td, Tr} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {Person} from "../../model/Person.ts";
import {PersonTableRow} from "./PersonTableRow.tsx";
import React from "react";

export const PersonTableRows: React.FC = () => {

  const query = useGetPersons();

  if (query.isPending) {
    return (<Tr><Td>Loading...</Td></Tr>)
  }

  if (query.isError) {
    return (<Tr><Td>Error: {(query.error as AxiosError).message}</Td></Tr>)
  }

  return (query.data.persons.map((person: Person) => <PersonTableRow person={person} key={person.id} />));
}