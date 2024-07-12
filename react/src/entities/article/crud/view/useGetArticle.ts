import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const getArticleApi = async (id: number) => {
  return (await axiosInstance.get(`/api/v1/articles/${id}`)).data;
}

export function useGetArticle(id: number) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleApi(id),
  });
}