import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../common/AxiosErrorResponseDto.ts";
import {Credentials} from "../model/Credentials.ts";
import axiosInstance from "../../common/axiosInstance.ts";

const useSignup = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseDto>, Credentials>({
    mutationKey: ['register-user-account'],
    mutationFn: (credentials: Credentials) => axiosInstance.post('/api/v1/auth/register', credentials)
  });
}

export {useSignup}