import {Td, Tr} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import PersonTableElement from "./PersonTableElement.tsx";
import {Person} from "../model/Person.ts";
import axiosInstance from "../../common/axiosInstance.ts";

const PersonTableElements = () => {

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/person/all');
      return await response.data.person;
    }
  });

  if (isPending) {
    return (<Tr><Td>Loading...</Td></Tr>)
  }

  if (isError) {
    return (<Tr><Td>Error: {error.message}</Td></Tr>)
  }

  return (
    data.map((element: Person, index: number) => {
        return (
          <PersonTableElement element={element} key={index} />
        )
      }
    )
  )
}

export default PersonTableElements;
