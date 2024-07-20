import {useMutation} from "@tanstack/react-query";
import {Credentials} from "../model/Credentials.ts";
import {axiosInstance} from "../../services/axios/axiosInstance.ts";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../services/axios/AxiosErrorResponseDto.ts";

const loginApi = async (credentials: Credentials) => {
  return (await axiosInstance.post('/api/v1/auth/login', credentials)).data;
}

export const useLogin = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseDto>, Credentials>({
    mutationKey: ['login'],
    mutationFn: loginApi,
  });
}