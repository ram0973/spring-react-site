import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const getPersonApi = async (id: string | undefined) => {
  // TODO: check id is number
  return (await axiosInstance.get(`/api/v1/persons/${id}`)).data;
}

export function useGetPerson(id: string | undefined) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => getPersonApi(id),
  });
}