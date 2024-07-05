import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Person} from "../../model/Person.ts";
import {axiosInstance} from "../../../../services/axios/axiosInstance.ts";

const createPersonApi = async (person: Person) => {
  await axiosInstance.post("/api/v1/persons", person);
}

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPerson'],
    mutationFn: createPersonApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["persons"]});
      console.info("successfully created person");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
