import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Person} from "../../model/Person.ts";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const updatePersonApi = async (person: Person) => {
  await axiosInstance.put(`/api/v1/persons/${person.id}`, person);
}

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: updatePersonApi,
    onSettled:
      async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({queryKey: ["persons"]})
        }
      }
  })
}