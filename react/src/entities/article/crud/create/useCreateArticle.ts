import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ArticleCreateRequestDto} from "../../model/ArticleCreateRequestDto.ts";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const createArticleApi = async (article) => {
  console.log(article);
  //const formData= new FormData();
  //const image: File = article.image[0]
  //formData.append("files", image);
  //article = { ...article, image: image.name };
  //formData.append("article", JSON.stringify(article));
  return await axiosInstance.post("api/v1/articles", article);

}

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createArticle'],
    mutationFn: createArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["articles"]}).catch((reason) => console.log(reason));
      console.info("successfully created article");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
