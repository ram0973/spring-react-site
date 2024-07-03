import {DefaultError, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {createPerson, deletePerson, updatePerson} from "./api.ts";

export function useDeletePerson(): UseMutationResult<void, DefaultError, number, unknown> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePerson'],
    mutationFn: deletePerson,
    onSettled:
      async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({queryKey: ["persons"]})
        }
      },
  })
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPerson'],
    mutationFn: createPerson,
    onSettled:
      async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({queryKey: ["persons"]})
        }
      },
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: updatePerson,
    onSettled:
      async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({queryKey: ["persons"]})
        }
      }
  })
}
