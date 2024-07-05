import {DefaultError, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const deletePersonApi = async (id: number) => {
  await axiosInstance.delete(`/api/v1/persons/${id}`);
}

export const useDeletePerson = (): UseMutationResult<void, DefaultError, number, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePerson'],
    mutationFn: deletePersonApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["persons"]});
      console.info("successfully deleted person");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  })
}
