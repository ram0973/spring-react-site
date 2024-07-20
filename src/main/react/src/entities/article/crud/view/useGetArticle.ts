import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const getArticleApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/articles/${id}`)).data;
}

export function useGetArticle(id: string | undefined) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleApi(id),
  });
}