import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";
import {PersonUpdateFormData} from "./zod.ts";

const updatePersonApi = async (person: PersonUpdateFormData) => {
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
