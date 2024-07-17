import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const deleteArticleApi = async (id: number) => {
  return await axiosInstance.delete(`/api/v1/articles/${id}`)
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

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteArticle'],
    mutationFn: deleteArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["articles"]});
      console.info("successfully deleted article");
    },
    onError: (error: Error) => {
      console.log(error);
    }
  });
}
