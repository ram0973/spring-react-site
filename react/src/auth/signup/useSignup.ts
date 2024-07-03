import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Credentials} from "../model/Credentials.ts";
import {AxiosErrorResponseDto} from "../../services/axios/AxiosErrorResponseDto.ts";
import axiosInstance from "../../services/axios/axiosInstance.ts";

const useSignup = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseDto>, Credentials>({
    mutationKey: ['register-user-account'],
    mutationFn: (credentials: Credentials) => axiosInstance.post('/api/v1/auth/register', credentials)
  });
}

export {useSignup}