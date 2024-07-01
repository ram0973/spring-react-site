import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../common/AxiosErrorResponseDto.ts";
import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import axiosInstance from "../../common/axiosInstance.ts";

const useCreatePerson = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseDto>, PersonEditRequestDto>({
    mutationKey: ['createPerson'],
    mutationFn: (person: PersonEditRequestDto) => axiosInstance.post("/api/v1/person", person),
    onSuccess: () => {
      console.info("successfully created person")
    },
    onError: (error: AxiosError) => {
      console.error(error);
    }
  });
};

export default useCreatePerson;