import {DefaultError, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";
import {useToast} from "@chakra-ui/toast";

const deletePersonApi = (id: number) => {
   return axiosInstance.delete(`/api/v1/persons/${id}`);
}

export const useDeletePerson = (): UseMutationResult => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePerson'],
    mutationFn: deletePersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["persons"]});
      console.info("successfully deleted person");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  })
}
