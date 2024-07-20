import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const deletePersonApi = async (id: number) => {
  return await axiosInstance.delete(`/api/v1/persons/${id}`)
  // .then(function (axiosResponse) {
  //   if (axiosResponse instanceof AxiosError) {
  //     throw new Error(axiosResponse.response?.data.message);
  //   }
  // })
  // .catch(function (error) {
  //   // обработка ошибки
  //   console.log("axios error:", error);
  //   return error;
  // })
}

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePerson'],
    mutationFn: deletePersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["persons"]});
      console.info("successfully deleted person");
    },
    onError: (error: Error) => {
      console.log(error);
    }
  });
}
