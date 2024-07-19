import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";
import {PersonCreateFormData} from "./zod.ts";

const createPersonApi = async (person: PersonCreateFormData) => {
  return (await axiosInstance.post("/api/v1/persons", person)).data;
}

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPerson'],
    mutationFn: createPersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["persons"]}).catch((reason)=>console.log(reason));
      console.info("successfully created person");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
