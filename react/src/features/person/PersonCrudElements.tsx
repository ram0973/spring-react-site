import {Td, Tr} from "@chakra-ui/react";
import {Person} from "../auth/models/models.ts";
import publicApi from "../../config/api-client.ts";
import {useQuery} from "@tanstack/react-query";
import PersonCrudElement from "./PersonCrudElement.tsx";

const PersonCrudElements = () => {

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await publicApi.get('/api/v1/person/all');
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
    data.map((element: Person) => {
        return (
          <>
            <PersonCrudElement element={element}/>
          </>
        )
      }
    )
  )
}

export default PersonCrudElements;
