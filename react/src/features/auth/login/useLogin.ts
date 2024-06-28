import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../common/AxiosErrorResponseDto.ts";
import {Credentials} from "../model/Credentials.ts";
import axiosInstance from "../../common/axiosInstance.ts";


const useLogin = () => {

  return useMutation<void, AxiosError<AxiosErrorResponseDto>, Credentials>({
    mutationKey: ['login'],
    mutationFn: (credentials: Credentials) => axiosInstance.post('/api/v1/auth/login', credentials)
  });
}

export {useLogin}