import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";
import {Article} from "../../model/Article.ts";

const updateArticleApi = async (article: Article) => {
  return await axiosInstance.put(`/api/v1/articles/${article.id}`, article);
}

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateArticle'],
    mutationFn: updateArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["articles"]}).catch((reason)=>console.log(reason))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
