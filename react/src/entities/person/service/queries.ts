import {useQuery} from "@tanstack/react-query";
import {getPerson, getPersons} from "./api.ts";

export function useGetPersons() {
  return useQuery({
    queryKey: ["persons"],
    queryFn: getPersons,
  });
}

export function useGetPerson(id: number) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id!),
  });
}