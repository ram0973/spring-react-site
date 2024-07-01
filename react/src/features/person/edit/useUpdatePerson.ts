import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../common/AxiosErrorResponseDto.ts";
import {PersonEditRequestDto} from "../dto/PersonEditRequestDto.ts";
import axiosInstance from "../../common/axiosInstance.ts";


const useUpdatePerson = ({id}) => {

  return useMutation<void, AxiosError<AxiosErrorResponseDto>, PersonEditRequestDto>({
     mutationKey: ['editPerson', id],
     mutationFn: (person: PersonEditRequestDto) => axiosInstance.put(`/api/v1/person/${person.id}`, person)
  });
};

export {useUpdatePerson};