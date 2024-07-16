import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const createArticleApi = async (article) => {

  //const formData= new FormData();
  const image: File = article.image[0]
  article = {...article, image}
  return (await axiosInstance.post("/api/v1/articles",
    article,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    })).data;
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
