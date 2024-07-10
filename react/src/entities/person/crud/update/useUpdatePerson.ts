import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Person} from "../../model/Person.ts";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const updatePersonApi = async (person: Person) => {
  return await axiosInstance.put(`/api/v1/persons/${person.id}`, person);
}

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: updatePersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["persons"]}).catch((reason)=>console.log(reason))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
