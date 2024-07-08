import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const getPersonApi = async (id: number | undefined) => {
  return (await axiosInstance.get(`/api/v1/persons/${id}`)).data;
}

export function useGetPerson(id: number) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => getPersonApi(id!),
  });
}